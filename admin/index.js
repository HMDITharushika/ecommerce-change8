// admin/index.js
const AdminJS = require("adminjs").default; // .default is required for v7+ in CJS
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const bcrypt = require("bcrypt");

// Import your models
const { User, Product, Category } = require("../models");

// Register the adapter
AdminJS.registerAdapter(AdminJSSequelize);

const admin = new AdminJS({
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
    cookiePassword: "supersecret-session-password", // Should be at least 32 chars in production
  },
  null, // No express app instance needed here
  {
    resave: false,
    saveUninitialized: true,
  }
);

module.exports = adminRouter;