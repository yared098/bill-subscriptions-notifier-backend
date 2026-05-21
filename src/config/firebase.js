const admin = require("firebase-admin");

let firebaseAdmin = null;

try {
  const serviceAccount = require("../../firebase-service.json");

  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccount
    ),
  });

  console.log(
    "✅ Firebase initialized"
  );
} catch (error) {
  console.log(
    "⚠ Firebase disabled (development mode)"
  );

  firebaseAdmin = null;
}

module.exports = firebaseAdmin;