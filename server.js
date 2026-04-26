

// // server.js - Updated Version

// require('dotenv').config(); // ✅ Add this at the very top

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const methodOverride = require('method-override');

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

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// // Static frontend files
// app.use(express.static('public'));

// // ==================== MONGODB ATLAS CONNECTION ====================
// // ✅ ONLY USE ENVIRONMENT VARIABLE - NO HARDCODED URI!
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
//   console.log(`📍 API Endpoints:`);
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



// server.js - Complete Updated Version with File Upload

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');           // ✅ FILE UPLOAD
const { v4: uuidv4 } = require('uuid');     // ✅ UNIQUE FILENAME

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

// Static frontend files
app.use(express.static('public'));

// ==================== FILE UPLOAD CONFIG ====================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
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

// ==================== API Routes ====================
// UPLOAD ROUTE - ✅ NEW
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({ 
      success: true,
      url: imageUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

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

// ==================== ORDER ROUTES ====================

// Save order (public)
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, address, items, total, status } = req.body;

    if (!name || !phone || !address || !items || !total) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newOrder = new Order({ 
      name, 
      phone, 
      address, 
      items, 
      total,
      status: status || 'Pending'
    });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: savedOrder._id
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get single order
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update Order (Confirm/Preparing)
app.put("/api/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status || "Preparing" },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Order
app.delete("/api/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
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
  console.log(`📁 Upload folder: public/uploads/`);
  console.log(`📤 New API: POST /api/upload`);
  console.log(`📊 API Endpoints:`);
  console.log(`   POST /api/upload`);
  console.log(`   GET  /api/orders`);
  console.log(`   POST /api/orders`);
  console.log(`   PUT  /api/orders/:id`);
  console.log(`   DELETE /api/orders/:id`);
  console.log(`   GET  /api/products`);
  console.log(`   POST /api/products`);
  console.log(`   GET  /api/auth`);
  console.log(`   GET  /api/admin`);
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