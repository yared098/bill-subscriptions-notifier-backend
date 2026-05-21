const Subscription = require("../models/subscription.model");

// =======================================
// ORGANIZATION CREATE SUBSCRIPTION
// =======================================
const createSubscription = async (data, organization) => {
  return await Subscription.create({
    ...data,
    organizationId: organization.id,
    organizationName: organization.name,
  });
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

// =======================================
// ORGANIZATION UPDATE
// =======================================
const updateSubscription = async (id, organizationId, data) => {
  return await Subscription.findOneAndUpdate(
    {
      _id: id,
      organizationId,
    },
    data,
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