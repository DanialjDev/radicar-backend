const userModel = require("../../model/user");
const personnelModel = require("../../model/personnel");

const seedDefaultAccounts = async () => {
  try {
    const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || "admin";
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin1234";
    const adminName = process.env.DEFAULT_ADMIN_NAME || "مدیر سیستم";
    const adminPhone = process.env.DEFAULT_ADMIN_PHONE || "09120000000";
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@seco.local";

    const userName = process.env.DEFAULT_USER_NAME || "کاربر پیش‌فرض";
    const userPassword = process.env.DEFAULT_USER_PASSWORD || "user1234";
    const userPhone = process.env.DEFAULT_USER_PHONE || "09120000001";

    const existingAdmin = await personnelModel.findOne({
      $or: [{ username: adminUsername }, { phoneNumber: adminPhone }],
    });

    if (!existingAdmin) {
      await personnelModel.create({
        name: adminName,
        username: adminUsername,
        password: adminPassword,
        phoneNumber: adminPhone,
        email: adminEmail,
        role: "Admin",
      });
      console.log(`[seed] Default admin created (username: ${adminUsername})`);
    } else {
      console.log("[seed] Default admin already exists, skipped");
    }

    const existingUser = await userModel.findOne({ phoneNumber: userPhone });

    if (!existingUser) {
      await userModel.create({
        name: userName,
        password: userPassword,
        phoneNumber: userPhone,
      });
      console.log(`[seed] Default user created (phone: ${userPhone})`);
    } else {
      console.log("[seed] Default user already exists, skipped");
    }
  } catch (error) {
    console.error("[seed] Failed to create default accounts:", error.message);
  }
};

module.exports = { seedDefaultAccounts };
