//require("dotenv").config();
//const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
//const Admin = require("./models/Admin");

//async function run() {
  //await mongoose.connect(process.env.MONGO_URI);

  //const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
  //if (existing) {
    //console.log("Admin already exists:", existing.username);
    //process.exit(0);
 // }

  //const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  //const admin = new Admin({
    //username: process.env.ADMIN_USERNAME,
   // passwordHash: hash,
  //});

  //await admin.save();
  //console.log("Admin seeded:", process.env.ADMIN_USERNAME);
  //process.exit(0);
//}

//run().catch((err) => {
 // console.error(err);
  //process.exit(1);
//});

// seedAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
  if (existing) {
    console.log("Admin already exists:", existing.username);
    process.exit(0);
  }

  // Password ko hash karna
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const admin = new Admin({
    username: process.env.ADMIN_USERNAME,
    password: hash,  // Use 'password' instead of 'passwordHash'
  });

  await admin.save();
  console.log("Admin seeded:", process.env.ADMIN_USERNAME);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

