// routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const Admin = require('../models/Admin');

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // ✅ CHANGE THIS LINE!
const Admin = require('../models/Admin');

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';
const TOKEN_EXPIRES = '2h';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ message: 'username and password required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // ✅ Fix here
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      SECRET_KEY,
      { expiresIn: TOKEN_EXPIRES }
    );

    return res.json({ success: true, token });
  } catch (err) {
    console.error('Auth login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
