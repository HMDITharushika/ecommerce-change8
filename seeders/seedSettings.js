const { Setting } = require("../models");

const seedSettings = async () => {
  const data = [
    {
      key: "site_name",
      value: "Orion Store",
      group: "general",
      description: "Website name",
    },
    {
      key: "currency",
      value: "LKR",
      group: "general",
      description: "Default currency",
    },
    {
      key: "maintenance_mode",
      value: false,
      group: "general",
      description: "Enable maintenance mode",
    },

    {
      key: "delivery_fee",
      value: 250,
      group: "business",
      description: "Standard delivery fee",
    },
    {
      key: "free_shipping_threshold",
      value: 5000,
      group: "business",
      description: "Free shipping limit",
    },

    {
      key: "allow_registration",
      value: true,
      group: "security",
      description: "Allow new users",
    },

    {
      key: "jwt_expiry",
      value: "1d",
      group: "security",
      description: "JWT expiry time",
    },

    {
      key: "theme",
      value: "light",
      group: "ui",
      description: "UI theme",
    },
  ];

  for (const item of data) {
    const exists = await Setting.findOne({ where: { key: item.key } });
    if (!exists) {
      await Setting.create(item);
    }
  }

  console.log("settings seeded");
};

module.exports = seedSettings;