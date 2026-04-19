const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const bcrypt = require("bcrypt");

const {
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Setting,
} = require("../models");

// Register adapter
AdminJS.registerAdapter(AdminJSSequelize);

// --------------------
// ADMIN CONFIG
// --------------------
const admin = new AdminJS({
  rootPath: "/admin",

  branding: {
    companyName: "Orion Company",
    withMadeWithLove: false,
    logo: false,
  },

  resources: [
    // ---------------- USER (ADMIN ONLY)
    {
      resource: User,
      options: {
        navigation: { name: "Admin", icon: "User" },

        properties: {
          password: {
            isVisible: {
              list: false,
              filter: false,
              show: false
            },
          },
        },

        actions: {
          new: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",

            before: async (request) => {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(
                  request.payload.password,
                  10
                );
              }
              return request;
            },
          },

          edit: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",

            before: async (request) => {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(
                  request.payload.password,
                  10
                );
              }
              return request;
            },
          },

          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
          },

          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
          },

          show: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
          },
        },
      },
    },

    // ---------------- PRODUCT (ALL USERS)
    {
      resource: Product,
      options: {
        navigation: { name: "Shop", icon: "ShoppingCart" },
      },
    },

    // ---------------- CATEGORY
    {
      resource: Category,
      options: {
        navigation: { name: "Shop", icon: "Category" },
      },
    },

    // ---------------- ORDER
    {
      resource: Order,
      options: {
        navigation: { name: "Orders", icon: "Order" },
      },
    },

    // ---------------- ORDER ITEMS
    {
      resource: OrderItem,
      options: {
        navigation: { name: "Orders", icon: "Order" },
      },
    },

    // ---------------- SETTINGS (ADMIN ONLY)
    {
      resource: Setting,
      options: {
        navigation: { name: "Admin", icon: "Settings" },

        actions: {
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
          },
          edit: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
          },
          new: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin && currentAdmin.role === "admin",
          },
        },
      },
    },
  ],
});

// --------------------
// AUTH ROUTER
// --------------------
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return null;

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return user; // 👈 allow BOTH admin + user
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