// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // 👇 third parameter me "admin" pass karo
// module.exports = mongoose.model("Admin", adminSchema, "admin");


// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'admin' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// ✅ Collection name "admins" (plural) use karein
module.exports = mongoose.model("Admin", adminSchema, "admin");