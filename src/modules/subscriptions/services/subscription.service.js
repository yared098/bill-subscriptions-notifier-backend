const Subscription = require("../models/subscription.model");
const { notifyUser } = require("../../notifications/services/notification.service");
const { onSubscriptionCreated } = require("../../notifications/events/notification.events");

const createSubscription = async (data, organization) => {
  const sub = await Subscription.create({
    ...data,
    organizationId: organization.id,
    organizationName: organization.organizationName,
  });

  // 🔔 trigger notification AFTER creation
  if (sub.userId) {
    await notifyUser({
      userId: sub.userId,
      title: "New Subscription Added",
      message: `${sub.serviceName} subscription has been created`,
      type: "subscription",
    });
  }
    await onSubscriptionCreated(sub, organization.organizationName);

  return sub;
};

// =======================================
// ORGANIZATION GET OWN SUBSCRIPTIONS
// =======================================
const getOrganizationSubscriptions = async (organizationId) => {
  return await Subscription.find({ organizationId }).sort({
    createdAt: -1,
  });
};

// =======================================
// USER GET ASSIGNED SUBSCRIPTIONS
// (supports userId + phone + visibility)
// =======================================
const getUserSubscriptions = async ({ userId, phone }) => {
  const query = {
    visibleToUser: true, // always respect visibility
    $or: [],
  };

  // =========================
  // MATCH BY USER ID
  // =========================
  if (userId) {
    query.$or.push({ userId });
  }

  // =========================
  // MATCH BY PHONE (optional)
  // =========================
  if (phone) {
    query.$or.push({ customerPhone: phone });
  }

  // =========================
  // SAFETY FALLBACK
  // =========================
  if (query.$or.length === 0) {
    return [];
  }

  return await Subscription.find(query).sort({
    renewalDate: 1, // nearest renewals first
  });
};


// =======================================
// USER UNSUBSCRIBE ONLY
// =======================================
const unsubscribe = async (subscriptionId, userPhone, reason) => {
  return await Subscription.findOneAndUpdate(
    {
      _id: subscriptionId,
      customerPhone: userPhone,
    },
    {
      unsubscribedByUser: true,
      unsubscribeReason: reason,
      unsubscribedAt: new Date(),
      status: "cancelled",
    },
    { new: true }
  );
};

const updateSubscription = async (id, organizationId, data) => {
  const allowedFields = [
    "serviceName",
    "amount",
    "billingCycle",
    "renewalDate",
    "status",
  ];

  const updateData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  return await Subscription.findOneAndUpdate(
    {
      _id: id,
      organizationId,
    },
    { $set: updateData },
    { new: true }
  );
};
// =======================================
// ORGANIZATION DELETE
// =======================================
const deleteSubscription = async (id, organizationId) => {
  return await Subscription.findOneAndDelete({
    _id: id,
    organizationId,
  });
};

module.exports = {
  createSubscription,
  getOrganizationSubscriptions,
  getUserSubscriptions,
  unsubscribe,
  updateSubscription,
  deleteSubscription,
};