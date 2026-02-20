const pool = require('./database');

async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create KodUser table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS KodUser (
        uid VARCHAR(50) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role ENUM('customer', 'manager', 'admin') DEFAULT 'customer',
        balance DECIMAL(15, 2) DEFAULT 100000.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create UserToken table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS UserToken (
        tid INT AUTO_INCREMENT PRIMARY KEY,
        token TEXT NOT NULL,
        uid VARCHAR(50) NOT NULL,
        expiry DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uid) REFERENCES KodUser(uid) ON DELETE CASCADE
      )
    `);
    
    connection.release();
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
