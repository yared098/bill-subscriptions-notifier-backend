const axios = require("axios");

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";

const initializeChapaPayment = async ({
  amount,
  email,
  reference,
  callbackUrl,
}) => {
  const response = await axios.post(
    CHAPA_URL,
    {
      amount,
      currency: "ETB",
      email,
      tx_ref: reference,
      callback_url: callbackUrl,
      return_url: callbackUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

module.exports = {
  initializeChapaPayment,
};