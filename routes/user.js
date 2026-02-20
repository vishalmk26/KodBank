const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const verifyToken = require('../middleware/auth');

// Check balance endpoint
router.get('/balance', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;
    
    // Fetch balance from database
    const [users] = await pool.query('SELECT balance FROM KodUser WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, balance: users[0].balance });
  } catch (error) {
    console.error('Balance check error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch balance' });
  }
});

module.exports = router;
