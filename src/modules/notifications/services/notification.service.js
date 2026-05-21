const admin = require("../../../config/firebase");

const Notification = require(
  "../models/notification.model"
);

const User = require(
  "../../auth/models/user.model"
);

const { sendToUser } = require(
  "../../../config/socket"
);

// =========================
// TWILIO SMS
// =========================
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// =========================
// CREATE DB NOTIFICATION
// =========================
const createNotification = async (
  data
) => {
  return await Notification.create(data);
};

// =========================
// EMAIL
// =========================
const sendEmail = async (
  email,
  subject,
  message
) => {
  console.log("Email sent:", email);
};

// =========================
// FIREBASE PUSH
// =========================
const sendPushNotification = async (
  token,
  title,
  message
) => {
  try {
    // =========================
    // SAFE CHECK (IMPORTANT)
    // =========================
    if (!admin || !token) {
      console.log(
        "⚠ Firebase disabled or missing token"
      );
      return null;
    }

    const response =
      await admin.messaging().send({
        token,
        notification: {
          title,
          body: message,
        },
      });

    return response;
  } catch (err) {
    console.log(
      "FCM error:",
      err.message
    );

    return null;
  }
};

// =========================
// SOCKET REALTIME
// =========================
const sendRealtimeNotification = (
  userId,
  data
) => {
  sendToUser(userId, data);
};

// =========================
// SMS
// =========================
const sendSMS = async (
  phone,
  message
) => {
  try {
    const sms =
      await client.messages.create({
        body: message,
        from:
          process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });

    return sms.sid;
  } catch (err) {
    console.log(
      "SMS error:",
      err.message
    );

    return null;
  }
};

// =========================
// MAIN UNIFIED FUNCTION
// =========================
const notifyUser = async ({
  userId,
  title,
  message,
  type = "system",
}) => {
  // =========================
  // GET USER
  // =========================
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // =========================
  // CHANNEL TRACKING
  // =========================
  const channels = {
    email: false,
    push: false,
    socket: false,
    sms: false,
  };

  // =========================
  // CREATE DB RECORD
  // =========================
  const notification =
    await createNotification({
      userId,
      title,
      message,
      type,
      channels,
      status: "pending",
    });

  const payload = {
    title,
    message,
    type,
    createdAt: new Date(),
  };

  // =========================
  // SOCKET
  // =========================
  sendRealtimeNotification(
    userId,
    payload
  );

  channels.socket = true;

  // =========================
  // FIREBASE PUSH
  // =========================
  if (
    user.notificationSettings?.push &&
    user.fcmToken
  ) {
    const fcmId =
      await sendPushNotification(
        user.fcmToken,
        title,
        message
      );

    if (fcmId) {
      channels.push = true;

      notification.fcmMessageId =
        fcmId;
    }
  }

  // =========================
  // EMAIL
  // =========================
  if (
    user.notificationSettings?.email &&
    user.email
  ) {
    await sendEmail(
      user.email,
      title,
      message
    );

    channels.email = true;
  }

  // =========================
  // SMS
  // =========================
  if (
    user.notificationSettings?.sms &&
    user.phone
  ) {
    const smsId = await sendSMS(
      user.phone,
      message
    );

    if (smsId) {
      channels.sms = true;

      notification.smsMessageId =
        smsId;
    }
  }

  // =========================
  // FINAL SAVE
  // =========================
  notification.channels = channels;

  notification.status = "sent";

  await notification.save();

  return notification;
};

// GET USER NOTIFICATIONS
const getUserNotifications = async (userId) => {
  return await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .lean();
};

// MARK AS READ
const markAsRead = async (id, userId) => {
  const notification = await Notification.findOne({
    _id: id,
    userId,
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.read = true;
  await notification.save();

  return notification;
};

module.exports = {
  notifyUser,
  getUserNotifications,   // ✅ ADD THIS
  markAsRead,  
};