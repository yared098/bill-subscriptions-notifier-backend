// utils/seedData.js

const Bill = require("../modules/bills/models/bill.model");
const Subscription = require("../modules/subscriptions/models/subscription.model");
const Notification = require("../modules/notifications/models/notification.model");
const seedData = async () => {
  try {
    // =========================================
    // OPTIONAL: CLEAR OLD DATA
    // =========================================
    await Bill.deleteMany({});
    await Subscription.deleteMany({});

    // =========================================
    // COMMON USER / ORGANIZATION INFO
    // =========================================

    const userId = "6a0c7612470d258c7a3e89e3";

    // Example company/organization account
    const organizationId = "6a0c7612470d258c7a3e89e3";

    // =========================================
    // SEED BILLS
    // =========================================

    await Bill.insertMany([
      {
        userId,
        organizationId,
        organizationName: "EEU Ethiopia",

        customerName: "Abel Tesfaye",
        customerPhone: "0911223344",

        title: "EEU Electric Bill",
        amount: 2500,
        dueDate: new Date("2026-06-01"),

        category: "Utilities",

        status: "unpaid",

        recurring: true,

        notes: "Monthly electricity payment",

        receiptImage: "",

        notificationSent: false,

        importedFromExcel: true,

        excelBatchId: "BATCH-001",
      },

      {
        userId,
        organizationId,
        organizationName: "Ethio Telecom",

        customerName: "Abel Tesfaye",
        customerPhone: "0911223344",

        title: "Ethio Telecom Internet",
        amount: 1899,
        dueDate: new Date("2026-06-05"),

        category: "Internet",

        status: "paid",

        recurring: true,

        notes: "Home Fiber Package",

        receiptImage: "",

        notificationSent: true,

        importedFromExcel: true,

        excelBatchId: "BATCH-001",
      },

      {
        userId,
        organizationId,
        organizationName: "AA Water Authority",

        customerName: "Abel Tesfaye",
        customerPhone: "0911223344",

        title: "Water Utility Bill",
        amount: 850,
        dueDate: new Date("2026-06-03"),

        category: "Utilities",

        status: "unpaid",

        recurring: true,

        notes: "Water Service Bill",

        receiptImage: "",

        notificationSent: false,

        importedFromExcel: true,

        excelBatchId: "BATCH-002",
      },

      {
        userId,
        organizationId,
        organizationName: "Sunshine Real Estate",

        customerName: "Abel Tesfaye",
        customerPhone: "0911223344",

        title: "House Rent",
        amount: 18000,
        dueDate: new Date("2026-06-10"),

        category: "Rent",

        status: "unpaid",

        recurring: true,

        notes: "Monthly Apartment Rent",

        receiptImage: "",

        notificationSent: false,

        importedFromExcel: false,
      },

      {
        userId,
        organizationId,
        organizationName: "DSTV Ethiopia",

        customerName: "Abel Tesfaye",
        customerPhone: "0911223344",

        title: "DSTV Subscription Payment",
        amount: 2200,
        dueDate: new Date("2026-06-08"),

        category: "Entertainment",

        status: "paid",

        recurring: true,

        notes: "Family Entertainment Package",

        receiptImage: "",

        notificationSent: true,

        importedFromExcel: true,

        excelBatchId: "BATCH-003",
      },
    ]);

    console.log("✅ Bills Seeded");

    // =========================================
// SEED NOTIFICATIONS
// =========================================

await Notification.insertMany([
  {
    userId,
    title: "Welcome to Billing System",
    message: "Your account has been successfully created",
    type: "system",
    read: false,
    channels: {
      email: true,
      push: true,
      socket: true,
      sms: false,
    },
    status: "sent",
  },

  {
    userId,
    title: "New Bill Assigned",
    message: "EEU Ethiopia added you to billing system",
    type: "bill",
    read: false,
    channels: {
      email: true,
      push: true,
      socket: true,
      sms: true,
    },
    status: "sent",
  },

  {
    userId,
    title: "Subscription Added",
    message: "Netflix Ethiopia subscription is now active",
    type: "subscription",
    read: false,
    channels: {
      email: false,
      push: true,
      socket: true,
      sms: false,
    },
    status: "sent",
  },

  {
    userId,
    title: "Upcoming Payment Reminder",
    message: "Your Water Utility Bill is due soon",
    type: "bill",
    read: false,
    channels: {
      email: true,
      push: true,
      socket: true,
      sms: true,
    },
    status: "sent",
  },

  {
    userId,
    title: "Organization Update",
    message: "DSTV Ethiopia updated your billing information",
    type: "organization",
    read: false,
    channels: {
      email: true,
      push: true,
      socket: true,
      sms: false,
    },
    status: "sent",
  },
]);

    // =========================================
    // SEED SUBSCRIPTIONS
    // =========================================

    await Subscription.insertMany([
      {
        userId,

        organizationId,

        organizationName: "Netflix Ethiopia",

        customerName: "Abel Tesfaye",

        customerPhone: "0911223344",

        customerEmail: "abel@gmail.com",

        serviceName: "Netflix",

        amount: 650,

        billingCycle: "monthly",

        renewalDate: new Date("2026-06-15"),

        autoRenew: true,

        category: "Entertainment",

        provider: "Netflix",

        notes: "Premium Plan",

        status: "active",

        notificationEnabled: true,

        importedFromExcel: true,

        excelBatchId: "SUB-001",

        visibleToUser: true,
      },

      {
        userId,

        organizationId,

        organizationName: "Spotify",

        customerName: "Abel Tesfaye",

        customerPhone: "0911223344",

        customerEmail: "abel@gmail.com",

        serviceName: "Spotify",

        amount: 299,

        billingCycle: "monthly",

        renewalDate: new Date("2026-06-20"),

        autoRenew: true,

        category: "Music",

        provider: "Spotify",

        notes: "Music Streaming",

        status: "active",

        notificationEnabled: true,

        importedFromExcel: true,

        excelBatchId: "SUB-001",

        visibleToUser: true,
      },

      {
        userId,

        organizationId,

        organizationName: "Canal+ Ethiopia",

        customerName: "Abel Tesfaye",

        customerPhone: "0911223344",

        serviceName: "Canal+",

        amount: 1200,

        billingCycle: "monthly",

        renewalDate: new Date("2026-06-25"),

        autoRenew: true,

        category: "TV",

        provider: "Canal+",

        notes: "Sports Channels",

        status: "active",

        notificationEnabled: true,

        importedFromExcel: true,

        excelBatchId: "SUB-002",

        visibleToUser: true,
      },

      {
        userId,

        organizationId,

        organizationName: "Google",

        customerName: "Abel Tesfaye",

        customerPhone: "0911223344",

        serviceName: "Google One",

        amount: 450,

        billingCycle: "monthly",

        renewalDate: new Date("2026-06-12"),

        autoRenew: true,

        category: "Cloud Storage",

        provider: "Google",

        notes: "100GB Cloud Plan",

        status: "active",

        notificationEnabled: true,

        importedFromExcel: false,

        visibleToUser: true,
      },

      {
        userId,

        organizationId,

        organizationName: "YouTube",

        customerName: "Abel Tesfaye",

        customerPhone: "0911223344",

        serviceName: "YouTube Premium",

        amount: 500,

        billingCycle: "monthly",

        renewalDate: new Date("2026-06-18"),

        autoRenew: false,

        category: "Entertainment",

        provider: "YouTube",

        notes: "Ad-Free YouTube",

        status: "cancelled",

        unsubscribedByUser: true,

        unsubscribeReason: "Too expensive",

        unsubscribedAt: new Date(),

        notificationEnabled: false,

        importedFromExcel: false,

        visibleToUser: true,
      },
    ]);

    console.log("✅ Subscriptions Seeded");
  } catch (error) {
    console.error("❌ Seed Error:", error.message);
  }
};

module.exports = seedData;