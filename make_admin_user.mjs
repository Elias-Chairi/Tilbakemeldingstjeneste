import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { statSync } from "fs";
const serviceAccountPath = "./secrets/serviceAccountKey.json";

function makeAdminUser(uid) {
  // check that file exists
  statSync(serviceAccountPath)

  const app = initializeApp({
    credential: cert(serviceAccountPath),
  });

  const auth = getAuth(app)
  
  auth.setCustomUserClaims(uid, { admin: true });
}

if (process.argv.length <= 2) {
  console.error("Expected at least one argument!");
  process.exit(1);
}

if (process.argv.length >= 4) {
  console.error("Too many arguments!");
  process.exit(1);
}

const uid = process.argv[2];

makeAdminUser(uid);
