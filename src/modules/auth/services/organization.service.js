const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Organization = require(
  "../models/organization.model"
);

// REGISTER
const registerOrganization = async (
  data
) => {
  const existingOrganization =
    await Organization.findOne({
      email: data.email,
    });

  if (existingOrganization) {
    throw new Error(
      "Organization already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(data.password, 10);

  const organization =
    await Organization.create({
      organizationName:
        data.organizationName,

      organizationType:
        data.organizationType,

      email: data.email,

      phone: data.phone,

      password: hashedPassword,

      address: data.address,

      website: data.website,

      description: data.description,
    });

  return organization;
};

// LOGIN
const loginOrganization = async (
  data
) => {
  const organization =
    await Organization.findOne({
      email: data.email,
    }).select("+password");

  if (!organization) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isMatch = await bcrypt.compare(
    data.password,
    organization.password
  );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token = jwt.sign(
    {
      id: organization._id,
      type: "organization",
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    organization,
  };
};

// UPDATE PROFILE
const updateOrganizationProfile =
  async (organizationId, data) => {
    const updatedOrganization =
      await Organization.findByIdAndUpdate(
        organizationId,
        {
          organizationName:
            data.organizationName,

          address: data.address,

          website: data.website,

          description:
            data.description,

          logo: data.logo,

          paymentMethods:
            data.paymentMethods,

          supportedServices:
            data.supportedServices,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    return updatedOrganization;
  };

// CHANGE PASSWORD
const changeOrganizationPassword =
  async (organizationId, data) => {
    const organization =
      await Organization.findById(
        organizationId
      ).select("+password");

    const isMatch =
      await bcrypt.compare(
        data.currentPassword,
        organization.password
      );

    if (!isMatch) {
      throw new Error(
        "Current password incorrect"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.newPassword,
        10
      );

    organization.password =
      hashedPassword;

    await organization.save();
  };

// DELETE
const deleteOrganization = async (
  organizationId
) => {
  await Organization.findByIdAndDelete(
    organizationId
  );
};

module.exports = {
  registerOrganization,
  loginOrganization,
  updateOrganizationProfile,
  changeOrganizationPassword,
  deleteOrganization,
};