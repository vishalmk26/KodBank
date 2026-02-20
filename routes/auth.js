const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Register endpoint
router.post('/register', async (req, res) => {
  const { uid, username, email, password, phone } = req.body;
  
  try {
    // Validate input
    if (!uid || !username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user
    await pool.query(
      'INSERT INTO KodUser (uid, username, email, password, phone, role, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [uid, username, email, hashedPassword, phone, 'customer', 100000.00]
    );
    
    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    
    // Fetch user
    const [users] = await pool.query('SELECT * FROM KodUser WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Calculate expiry time
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    
    // Store token in database
    await pool.query(
      'INSERT INTO UserToken (token, uid, expiry) VALUES (?, ?, ?)',
      [token, user.uid, expiry]
    );
    
    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({ success: true, message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
