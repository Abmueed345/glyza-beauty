// scripts/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

async function run() {
  const mongo = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unitedfood';
  await mongoose.connect(mongo);
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || '12345';

  const hash = await bcrypt.hash(password, 10);
  const existing = await Admin.findOne({ username });
  if (existing) {
    existing.passwordHash = hash;
    await existing.save();
    console.log('Updated admin password for', username);
  } else {
    const admin = new Admin({ username, passwordHash: hash });
    await admin.save();
    console.log('Created admin', username);
  }
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
