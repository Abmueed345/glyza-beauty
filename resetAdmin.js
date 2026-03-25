// resetAdmin.js
//const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");
//require("dotenv").config();

// MongoDB connection
//const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/unitedfood";
//mongoose.connect(MONGO_URI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
//});

// MongoDB connection
//const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/unitedfood";
//mongoose.connect(MONGO_URI); // Ab yahan koi options nahi hain

//const adminSchema = new mongoose.Schema({
  //username: String,
  //password: String,
//});

//const Admin = mongoose.model("Admin", adminSchema);

//async function createAdmin() {
  //try {
    // delete old admins
   /// await Admin.deleteMany({});

     //hash password
    //const hashedPassword = await bcrypt.hash("12345", 10);

    //create new admin
    //const admin = new Admin({
     // username: "admin",
     // password: hashedPassword,
    //});

    //await admin.save();
   //console.log("✅ Admin created successfully with username: admin & password: 12345");
 // } catch (error) {
   // console.error("❌ Error creating admin:", error);
 // } finally {
   // mongoose.disconnect();
  //}
//}

//createAdmin();
 //resetAdmin.js


// resetAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

mongoose.set('strictQuery', true);

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "12345";
const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || "admin";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/unitedfood";

// Admin Schema Definition
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Use 'password' for consistency
}, { collection: 'admin' }); // Collection ka naam 'admin' set kiya

// Model define karein
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function createAdmin() {
  await mongoose.connect(MONGO_URI);
  console.log("🚀 MongoDB connected successfully for seeding.");

  try {
    // Purane admin records ko delete kar dein
    await Admin.deleteMany({});
    console.log("🧹 Previous admin records cleared.");

    // Password ko hash karna
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    console.log("🔑 Password hashed successfully.");

    // Naya admin user create karna
    const admin = new Admin({
      username: DEFAULT_USERNAME,
      password: hashedPassword, // Use password field instead of passwordHash
    });

    await admin.save();
    console.log(`✅ Admin created successfully! Username: ${DEFAULT_USERNAME} & Password: ${DEFAULT_PASSWORD}`);

  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB connection closed.");
  }
}

createAdmin();
