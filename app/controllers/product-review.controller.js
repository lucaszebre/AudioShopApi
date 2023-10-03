const pool = require('../config/db.config.js')

exports.getUserById = (req, res) => {
    const userId = req.params.userId; // Assuming it's in the URL parameter
    
        pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        })
    }

// exports.createUser = (req, res) => {
//     const { username, email } = req.body
//     Id=1
//         pool.query('INSERT INTO users (username, email,Id) VALUES ($1, $2,$3) RETURNING *', [username, email,Id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         res.status(201).send(`User added with ID: ${results.rows[0].id}`)
//         })
//     }
    exports.updateUser = (req, res) => {
        const id = req.params.userId;
        const { username, email } = req.body;
        
        // Check which fields to update
        let updateFields = [];
        if (username) {
            updateFields.push('username = $1');
        }
        if (email) {
            updateFields.push('email = $2');
        }
    
        // Construct the query dynamically
        const updateQuery = `
            UPDATE users
            SET ${updateFields.join(', ')}
            WHERE id = $${updateFields.length + 1}
            RETURNING *
        `;
    
        // Construct parameter array for the query
        const queryParams = [];
        if (username) {
            queryParams.push(username);
        }
        if (email) {
            queryParams.push(email);
        }
        queryParams.push(id);
    
        pool.query(updateQuery, queryParams, (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
    };

    
    

    