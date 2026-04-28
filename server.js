

// // // server.js - Updated Version

// // require('dotenv').config(); // ✅ Add this at the very top

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const path = require('path');
// // const methodOverride = require('method-override');

// // // Routes
// // const adminRoutes = require("./routes/adminRoutes");
// // const productRoutes = require('./routes/productRoutes');
// // const orderRoutes = require('./routes/orderRoutes');
// // const authRoutes = require('./routes/authRoutes');

// // // Models
// // const Order = require('./models/Order');

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(methodOverride('_method'));

// // // API Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/products', productRoutes);
// // app.use('/api/orders', orderRoutes);

// // // Static frontend files
// // app.use(express.static('public'));

// // // ==================== MONGODB ATLAS CONNECTION ====================
// // // ✅ ONLY USE ENVIRONMENT VARIABLE - NO HARDCODED URI!
// // const MONGODB_URI = process.env.MONGO_URI;

// // if (!MONGODB_URI) {
// //   console.error('❌ MONGO_URI environment variable is not set!');
// //   process.exit(1);
// // }

// // mongoose.connect(MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => {
// //   console.log('✅ MongoDB Atlas Connected Successfully!');
// //   console.log(`📊 Database: HAM LUXURY PERFUME`);
// // })
// // .catch((err) => {
// //   console.error('❌ MongoDB Atlas Connection Error:', err.message);
// //   process.exit(1);
// // });

// // // ==================== ORDER ROUTES ====================

// // // Save order (public)
// // app.post('/api/orders', async (req, res) => {
// //   try {
// //     const { name, phone, address, items, total, status } = req.body;

// //     if (!name || !phone || !address || !items || !total) {
// //       return res.status(400).json({ message: 'Please provide all required fields.' });
// //     }

// //     const newOrder = new Order({ 
// //       name, 
// //       phone, 
// //       address, 
// //       items, 
// //       total,
// //       status: status || 'Pending'
// //     });
// //     const savedOrder = await newOrder.save();

// //     res.status(201).json({
// //       message: 'Order placed successfully!',
// //       orderId: savedOrder._id
// //     });
// //   } catch (error) {
// //     console.error('Error placing order:', error);
// //     res.status(500).json({ message: 'Server error. Please try again later.' });
// //   }
// // });

// // // Get all orders
// // app.get('/api/orders', async (req, res) => {
// //   try {
// //     const orders = await Order.find().sort({ createdAt: -1 });
// //     res.status(200).json({ success: true, orders });
// //   } catch (error) {
// //     console.error("Error fetching orders:", error);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // Get single order
// // app.get('/api/orders/:id', async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }
// //     res.status(200).json({ success: true, order });
// //   } catch (error) {
// //     console.error("Error fetching order:", error);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // // Update Order (Confirm/Preparing)
// // app.put("/api/orders/:id", async (req, res) => {
// //   try {
// //     const updatedOrder = await Order.findByIdAndUpdate(
// //       req.params.id,
// //       { status: req.body.status || "Preparing" },
// //       { new: true }
// //     );
// //     if (!updatedOrder) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }
// //     res.json(updatedOrder);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Delete Order
// // app.delete("/api/orders/:id", async (req, res) => {
// //   try {
// //     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
// //     if (!deletedOrder) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }
// //     res.json({ message: "Order deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // ==================== FRONTEND FALLBACK ====================
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// // });

// // // ==================== START SERVER ====================
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// //   console.log(`📍 API Endpoints:`);
// //   console.log(`   GET  /api/orders`);
// //   console.log(`   POST /api/orders`);
// //   console.log(`   PUT  /api/orders/:id`);
// //   console.log(`   DELETE /api/orders/:id`);
// //   console.log(`   GET  /api/products`);
// //   console.log(`   POST /api/products`);
// //   console.log(`   GET  /api/auth`);
// //   console.log(`   GET  /api/admin`);
// // });

// // // ==================== ERROR HANDLING ====================
// // process.on('unhandledRejection', (err) => {
// //   console.error('❌ Unhandled Rejection:', err);
// //   process.exit(1);
// // });

// // process.on('SIGTERM', () => {
// //   console.log('👋 SIGTERM received. Shutting down gracefully...');
// //   mongoose.connection.close(() => {
// //     console.log('💾 MongoDB connection closed');
// //     process.exit(0);
// //   });
// // });



// // server.js - Complete Updated Version with File Upload

// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const methodOverride = require('method-override');
// const multer = require('multer');           // ✅ FILE UPLOAD
// const { v4: uuidv4 } = require('uuid');     // ✅ UNIQUE FILENAME

// // Routes
// const adminRoutes = require("./routes/adminRoutes");
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const authRoutes = require('./routes/authRoutes');

// // Models
// const Order = require('./models/Order');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(methodOverride('_method'));

// // Static frontend files
// app.use(express.static('public'));

// // // ==================== FILE UPLOAD CONFIG ====================
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'public/uploads/');
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueName = uuidv4() + '-' + Date.now() + path.extname(file.originalname);
// //     cb(null, uniqueName);
// //   }
// // });

// // const upload = multer({ 
// //   storage: storage,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// //   fileFilter: (req, file, cb) => {
// //     if (file.mimetype.startsWith('image/')) {
// //       cb(null, true);
// //     } else {
// //       cb(new Error('Only image files allowed!'), false);
// //     }
// //   }
// // });

// // // ==================== API Routes ====================
// // // UPLOAD ROUTE - ✅ NEW
// // app.post('/api/upload', upload.single('image'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: 'No image uploaded' });
// //     }
    
// //     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
// //     res.json({ 
// //       success: true,
// //       url: imageUrl,
// //       filename: req.file.filename 
// //     });
// //   } catch (error) {
// //     console.error('Upload error:', error);
// //     res.status(500).json({ error: 'Upload failed' });
// //   }
// // });

// // ==================== FILE UPLOAD CONFIG (FIXED) ====================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Ensure uploads directory exists
//     const fs = require('fs');
//     const uploadDir = 'public/uploads/';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = uuidv4() + '-' + Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files allowed!'), false);
//     }
//   }
// });

// // // ==================== FIXED UPLOAD ROUTE ====================
// // app.post('/api/upload', upload.single('image'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: 'No image uploaded' });
// //     }
    
// //     // ✅ FIXED: Always use HTTPS + correct domain
// //     const protocol = req.get('X-Forwarded-Proto') === 'https' || req.protocol === 'https' ? 'https' : 'http';
// //     const host = req.get('host') || req.hostname;
// //     const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    
// //     console.log('✅ Image uploaded:', imageUrl); // Debug log
    
// //     res.json({ 
// //       success: true,
// //       url: imageUrl,
// //       filename: req.file.filename 
// //     });
// //   } catch (error) {
// //     console.error('❌ Upload error:', error);
// //     res.status(500).json({ error: 'Upload failed: ' + error.message });
// //   }
// // });

// app.post('/api/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image uploaded' });
//     }
    
//     // ✅ YE NEW CODE COPY-PASTE karein
//     let protocol = 'https';  // FORCE HTTPS
//     let host = req.get('host');
    
//     // Localhost ke liye HTTP allow
//     if (host.includes('localhost') || host.includes('127.0.0.1')) {
//       protocol = 'http';
//     }
    
//     const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    
//     console.log('✅ Upload success:', imageUrl);  // YE line already hai
    
//     res.json({ 
//       success: true,
//       url: imageUrl,
//       filename: req.file.filename 
//     });
//   } catch (error) {
//     console.error('❌ Upload error:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// // ==================== MONGODB ATLAS CONNECTION ====================
// const MONGODB_URI = process.env.MONGO_URI;

// if (!MONGODB_URI) {
//   console.error('❌ MONGO_URI environment variable is not set!');
//   process.exit(1);
// }

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ MongoDB Atlas Connected Successfully!');
//   console.log(`📊 Database: HAM LUXURY PERFUME`);
// })
// .catch((err) => {
//   console.error('❌ MongoDB Atlas Connection Error:', err.message);
//   process.exit(1);
// });

// // ==================== ORDER ROUTES ====================

// // Save order (public)
// app.post('/api/orders', async (req, res) => {
//   try {
//     const { name, phone, address, items, total, status } = req.body;

//     if (!name || !phone || !address || !items || !total) {
//       return res.status(400).json({ message: 'Please provide all required fields.' });
//     }

//     const newOrder = new Order({ 
//       name, 
//       phone, 
//       address, 
//       items, 
//       total,
//       status: status || 'Pending'
//     });
//     const savedOrder = await newOrder.save();

//     res.status(201).json({
//       message: 'Order placed successfully!',
//       orderId: savedOrder._id
//     });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

// // Get all orders
// app.get('/api/orders', async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get single order
// app.get('/api/orders/:id', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Update Order (Confirm/Preparing)
// app.put("/api/orders/:id", async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status || "Preparing" },
//       { new: true }
//     );
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete Order
// app.delete("/api/orders/:id", async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ==================== FRONTEND FALLBACK ====================
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // ==================== START SERVER ====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📁 Upload folder: public/uploads/`);
//   console.log(`📤 New API: POST /api/upload`);
//   console.log(`📊 API Endpoints:`);
//   console.log(`   POST /api/upload`);
//   console.log(`   GET  /api/orders`);
//   console.log(`   POST /api/orders`);
//   console.log(`   PUT  /api/orders/:id`);
//   console.log(`   DELETE /api/orders/:id`);
//   console.log(`   GET  /api/products`);
//   console.log(`   POST /api/products`);
//   console.log(`   GET  /api/auth`);
//   console.log(`   GET  /api/admin`);
// });

// // ==================== ERROR HANDLING ====================
// process.on('unhandledRejection', (err) => {
//   console.error('❌ Unhandled Rejection:', err);
//   process.exit(1);
// });

// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM received. Shutting down gracefully...');
//   mongoose.connection.close(() => {
//     console.log('💾 MongoDB connection closed');
//     process.exit(0);
//   });
// });


// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const methodOverride = require('method-override');
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs'); // ✅ Added for folder creation

// // Routes
// const adminRoutes = require("./routes/adminRoutes");
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const authRoutes = require('./routes/authRoutes');

// // Models
// const Order = require('./models/Order');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(methodOverride('_method'));

// // Static frontend files
// app.use(express.static('public'));

// // ==================== 🔥 PERFECT FILE UPLOAD CONFIG ====================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = 'public/uploads/';
//     // ✅ Auto create folder if not exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//       console.log('📁 Created uploads folder');
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = uuidv4() + '-' + Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files allowed!'), false);
//     }
//   }
// });

// // ==================== 🔥 100% FIXED UPLOAD ROUTE ====================
// app.post('/api/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image uploaded' });
//     }
    
//     // 🔥 PERFECT HTTPS/HTTP LOGIC
//     const host = req.get('host') || 'localhost:5000';
//     const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
//     const protocol = isLocalhost ? 'http' : 'https';
//     const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    
//     // ✅ DEBUG LOGS
//     console.log('🔥 UPLOAD SUCCESS!');
//     console.log('🌐 URL:', imageUrl);
//     console.log('📱 Host:', host);
//     console.log('🔗 Protocol:', protocol);
    
//     res.json({ 
//       success: true,
//       url: imageUrl,
//       filename: req.file.filename 
//     });
//   } catch (error) {
//     console.error('❌ UPLOAD ERROR:', error.message);
//     res.status(500).json({ error: 'Upload failed: ' + error.message });
//   }
// });

// // ==================== API ROUTES ====================
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// // ==================== MONGODB ATLAS CONNECTION ====================
// const MONGODB_URI = process.env.MONGO_URI;

// if (!MONGODB_URI) {
//   console.error('❌ MONGO_URI environment variable is not set!');
//   process.exit(1);
// }

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ MongoDB Atlas Connected Successfully!');
//   console.log(`📊 Database: GLYZA BEAUTY`);
// })
// .catch((err) => {
//   console.error('❌ MongoDB Atlas Connection Error:', err.message);
//   process.exit(1);
// });

// // ==================== ORDER ROUTES ====================
// app.post('/api/orders', async (req, res) => {
//   try {
//     const { name, phone, address, items, total, status } = req.body;

//     if (!name || !phone || !address || !items || !total) {
//       return res.status(400).json({ message: 'Please provide all required fields.' });
//     }

//     const newOrder = new Order({ 
//       name, phone, address, items, total,
//       status: status || 'Pending'
//     });
//     const savedOrder = await newOrder.save();

//     res.status(201).json({
//       message: 'Order placed successfully!',
//       orderId: savedOrder._id
//     });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

// app.get('/api/orders', async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.get('/api/orders/:id', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// app.put("/api/orders/:id", async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status: req.body.status || "Preparing" },
//       { new: true }
//     );
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete("/api/orders/:id", async (req, res) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     if (!deletedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ==================== FRONTEND FALLBACK ====================
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // ==================== START SERVER ====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📁 Upload folder: public/uploads/ ✅ READY`);
//   console.log(`🔥 UPLOAD API: POST /api/upload ✅ FIXED`);
//   console.log(`📊 All APIs Ready!`);
// });

// // ==================== ERROR HANDLING ====================
// process.on('unhandledRejection', (err) => {
//   console.error('❌ Unhandled Rejection:', err);
//   process.exit(1);
// });

// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM received. Shutting down gracefully...');
//   mongoose.connection.close(() => {
//     console.log('💾 MongoDB connection closed');
//     process.exit(0);
//   });
// });


require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;  // 🔥 NEW CLOUDINARY

// Routes
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Models
const Order = require('./models/Order');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// 🔥 CLOUDINARY CONFIG (Permanent Images)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 🔥 CLOUDINARY UPLOAD STORAGE (Temporary local → Cloud)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'public/uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('📁 Created uploads folder');
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4() + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed!'), false);
    }
  }
});

// 🔥 PERMANENT CLOUDINARY UPLOAD (Replace Old Local Upload)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    
    const localPath = `public/uploads/${req.file.filename}`;
    
    // Upload to Cloudinary (Permanent!)
    const cloudResult = await cloudinary.uploader.upload(localPath, {
      folder: 'ham-luxury-perfume',  // Organized folder
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto'
    });
    
    // Delete temporary local file
    fs.unlink(localPath, (err) => {
      if (err) console.log('⚠️ Local cleanup failed:', err.message);
    });
    
    // Permanent Cloudinary URL
    const imageUrl = cloudResult.secure_url;
    
    console.log('✅ CLOUDINARY UPLOAD SUCCESS!');
    console.log('🌐 Permanent URL:', imageUrl);
    
    res.json({ 
      success: true,
      url: imageUrl,  // Always Cloudinary URL
      filename: req.file.filename,
      cloudinary_id: cloudResult.public_id
    });
    
  } catch (error) {
    console.error('❌ CLOUDINARY UPLOAD ERROR:', error.message);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

// ==================== API ROUTES ====================
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ==================== MONGODB ATLAS CONNECTION ====================
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGO_URI environment variable is not set!');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas Connected Successfully!');
  console.log(`📊 Database: HAM LUXURY PERFUME`);
})
.catch((err) => {
  console.error('❌ MongoDB Atlas Connection Error:', err.message);
  process.exit(1);
});

// ==================== ORDER ROUTES (Same) ====================
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, items, total, status } = req.body;
    if (!name || !phone || !address || !items || !total) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    const newOrder = new Order({ name, phone, address, items, total, status: status || 'Pending' });
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!', orderId: savedOrder._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status || "Preparing" },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== FRONTEND FALLBACK ====================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`☁️  Cloudinary: dgo9kvfic ✅ PERMANENT IMAGES`);
  console.log(`📁 Local uploads: TEMPORARY only`);
  console.log(`🔥 UPLOAD API: POST /api/upload → CLOUDINARY`);
  console.log(`📊 All APIs Ready!`);
});

// ==================== ERROR HANDLING ====================
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('💾 MongoDB connection closed');
    process.exit(0);
  });
});