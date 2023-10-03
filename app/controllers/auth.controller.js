const pool = require('../config/db.config.js')
const uuid = require('uuid')
const { authentication, random } = require('../helpers')

// Registration
exports.register = async (req, res) => {
    const role = 'visitor'
    const { username, email, password } = req.body;

    // check if the username , email , password is present 
    if(!username||!email||!password){
        return res.sendStatus(400).json({message:'miss parameter'})
    }

    // check if the user is already register
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (results.rowCount  >0) {
            return res.sendStatus(400).json({message:'user already register'})
        }
        })

    const salt = random();

    try {
            pool.query('INSERT INTO users (username, email,id,password,role,salt) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *', [username, email,uuid.v4(),authentication(salt, password),role,salt], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).json(`User added with ID: ${results.rows[0].id}`)
            })

    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
};

// Login
exports.login = async (req, res) => {
    const {  email , password } = req.body;

    // check if the email and password is present 
    if(!email||!password){
        return res.sendStatus(400)
    }
    try {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (results.rowCount <1) {
                res.status(400).send({message:'user not found'})
            }
            const expectedHash = authentication(results.rows[0].salt, password);

            if (results.rows[0].password != expectedHash) {
                return res.sendStatus(403);
                }
            
            const salt = random();
            const sessionToken = authentication(salt, results.rows[0].id);

            pool.query('UPDATE users SET sessionToken = $1 WHERE id = $2 RETURNING *', [sessionToken,results.rows[0].id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    })
            res.cookie('LUCAS-AUTH', sessionToken, { httpOnly: true, sameSite: "none", secure: true });

                    res.status(200).send({
                        id: results.rows[0].id,
                        username: results.rows[0].username,
                        email: results.rows[0].email,
                        roles: results.rows[0].role,
                        sessionToken: sessionToken
                        });
        
        })
        
    } catch (error) {
        res.status(500).send({ message: error.message });

    }    
};

exports.logout = async (req, res) => {
    const { userId } = req.body;
   // Clear the session token from the cookie
    res.clearCookie('LUCAS-AUTH', { httpOnly: true, sameSite: "none", secure: true });
    

    try {
        pool.query('UPDATE users SET sessionToken = NULL WHERE id = $1', [userId], (error, results) => {
            if (error) {
                throw error;
            }
            // Optionally, you can handle the success response here
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        // Handle any errors that occur during the database update
        res.status(500).json({ message: 'Error logging out' });
    }
};


