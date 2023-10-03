const  { merge, get } =  require('lodash');
const pool = require('../config/db.config.js')

const isAuthenticated = async (req, res, next) => {
  try {
    const sessionToken = req.cookies['LUCAS-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    pool.query('SELECT * FROM users WHERE sessionToken = $1', [sessionToken], (error, results) => {
      if (error) {
        console.error(error);
        return res.sendStatus(500); // Handle database error
      }

      if (results.rowCount === 0) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Assuming `existingUser` should come from your database query result
      const existingUser = results.rows[0];

      // Merge the existing user data into the request object
      merge(req, { identity: existingUser });

      // Call the next middleware
      return next();
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
}

module.exports = isAuthenticated;