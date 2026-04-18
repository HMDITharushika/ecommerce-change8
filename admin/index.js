// admin/index.js
const AdminJS = require("adminjs"); // .default is required for v7+ in CJS
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const bcrypt = require("bcrypt");

// Import your models
const { User, Product, Category, Order, OrderItem, Setting } = require("../models");

// Register the adapter
AdminJS.registerAdapter(AdminJSSequelize);

const admin = new AdminJS({
  branding: {
    companyName: "Admin View",
    theme: {
      colors: {
        primary100: "#1e293b",
        primary80: "#334155",
      }
    },
    withMadeWithLove: false,
    logo: false,
  },
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: false },
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },
        },
      },
    },
    Product,
    Category,
    Order,
    OrderItem,
    Setting,
  ],
  dashboard: {
    handler: async () => {
      // Ensure User is defined before calling count
      const users = User ? await User.count() : 0;
      return { users };
    },
  },
  rootPath: "/admin",
});

// Build the authenticated router
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return null;

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch && user.role === "admin") {
        return user;
      }
      return null;
    },
    cookiePassword: "supersecret-session-password",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

module.exports = adminRouter;