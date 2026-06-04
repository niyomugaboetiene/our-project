import express from "express";
import connect from "../config/conn.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
            // username	password	role
            const { username, password, role } = req.body;

            if (!username || !password || !role) {
                return res.status(400).json({ message: 'Fill out missing fields' });
            }

            const [IsUsernameExist] = await connect.query(
                `SELECT * FROM User WHERE username = ?`, [username]
            );

            if (IsUsernameExist.length > 0) {
                return res.status(400).json({ message: 'User name is already taken' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await connect.query(
                `INSERT INTO User (username, password, role) VALUES(?, ?, ?)`,[username, hashedPassword, role]
            );

            return res.status(201).json({ message: 'New User register successfully' });
    } catch (err) {
        console.error(err);
    }
});

router.post('/login', async (req, res) => {
    try {
           const { username, password, role } = req.body;

            if (!username || !password || !role) {
                return res.status(400).json({ message: 'Fill out missing fields' });
            }

            const [IsUsernameExist] = await connect.query(
                `SELECT * FROM User WHERE username = ?`, [username]
            );

            if (IsUsernameExist.length === 0) {
                return res.status(400).json({ message: 'Invalid User name' });
            } 

            const hashedPassword = IsUsernameExist[0].password;

            const isPasswordTrue = await bcrypt.compare(password, hashedPassword);

            if (!isPasswordTrue) {
                return res.status(401).json({ message: 'Incorrect password' });
            } 


            req.session.user = {
                user_id = IsUsernameExist[0].user_id,
                username = IsUsernameExist[0].username
            };

            return res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        console.error(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out'});
            }

            return res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (err) {
        console.error(err);
    }
})