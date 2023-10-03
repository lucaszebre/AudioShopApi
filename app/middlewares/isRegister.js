const pool = require('../config/db.config.js');

const alreadyRegister = (req, res, next) => {
    const { email } = req.body;

    // Check if the user is already registered
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.rowCount > 0) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // If the user is not registered, proceed to the next middleware
        next();
    });
};

module.exports = alreadyRegister; // Corrected export statement
