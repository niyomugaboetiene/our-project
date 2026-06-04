import connect from "../config/conn.js";
import express from "express";

const isAuthorized = (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Login first' });
        }

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).join({ message: 'Internal server error' });
    }
}

const router = express.Router();

router.post('/addNew',isAuthorized, async (req, res) => {
    try {
        const { Full_Name, National_Id, Phone, Email, Address } = req.body;

        if (!Full_Name || !National_Id || !Phone || !Email || !Address) {
            return res.status(400).json({ message: 'fill out missing fields' });
        }

        if (National_Id.toString().length !== 16) {
            return res.status(400).json({ message: 'National Id must be exactly 16 digits' });
        }

        const [existing] = await connect.query(
            'SELECT * FROM Customer WHERE Phone = ? OR Email = ?',
            [Phone, Email]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: 'Phone or Email already exists'
            });
        }

        await connect.query(
            'INSERT INTO Customer (Full_Name, National_Id, Phone, Email, Address) VALUES (?, ?, ?, ?, ?)',
            [Full_Name, National_Id, Phone, Email, Address]
        );

        return res.status(201).json({ message: 'New Customer added successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/list', isAuthorized, async (req, res) => {
    try {
        const [list] = await connect.query('SELECT * FROM Customer');

        if (list.length === 0) {
            return res.status(200).json({ message: 'No list in the system' });
        }


        return res.status(200).json({ message:' List', list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get('/list/:National_Id', isAuthorized, async (req, res) => {
    try {
        const National_Id = req.params.National_Id;

        const [list] = await connect.query('SELECT * FROM Customer WHERE National_Id = ?', [National_Id]);

        if (list.length === 0) {
            return res.status(200).json({ message: 'No list in the system' });
        }

        return res.status(200).json({ message:' List', list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.put('/update/:National_Id', isAuthorized, async (req, res) => {
    try {
        const currentNationalId = req.params.National_Id;
        const { Full_Name, National_Id, Phone, Email, Address } = req.body;

        if (Phone || Email) {
            const [existing] = await connect.query(
                `SELECT * FROM Customer
                 WHERE (Phone = ? OR Email = ?)
                 AND National_Id != ?`,
                [Phone || '', Email || '', currentNationalId]
            );

            if (existing.length > 0) {
                return res.status(400).json({
                    message: 'Phone or Email already exists'
                });
            }
        }

        let fields = [];
        let values = [];

        if (Full_Name) {
            fields.push('Full_Name = ?');
            values.push(Full_Name);
        }

        if (National_Id) {
            fields.push('National_Id = ?');
            values.push(National_Id);
        }

        if (Phone) {
            fields.push('Phone = ?');
            values.push(Phone);
        }

        if (Email) {
            fields.push('Email = ?');
            values.push(Email);
        }

        if (Address) {
            fields.push('Address = ?');
            values.push(Address);
        }

        values.push(currentNationalId);

        const sql = `UPDATE Customer SET ${fields.join(', ')} WHERE National_Id = ?`;

        await connect.query(sql, values);

        return res.status(200).json({ message: 'Updated successfully' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete/:National_Id',isAuthorized, async (req, res) => {
    try {
        const National_Id = req.params.National_Id;

        await connect.query(
            'DELETE FROM Customer WHERE National_Id = ?', [National_Id]
        );

        return res.status(200).json({ message: 'Deleted successfully '});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get('/report/totals', isAuthorized, async (req, res) => {
    try {
        const [totalCustomers] = await connect.query(
            `SELECT COUNT(*) AS totalCustomers FROM Customer`
        );

        const [totalWithEmail] = await connect.query(
            `SELECT COUNT(*) AS totalWithEmail FROM Customer WHERE Email IS NOT NULL`
        );

        const [totalWithPhone] = await connect.query(
            `SELECT COUNT(*) AS totalWithPhone FROM Customer WHERE Phone IS NOT NULL`
        );

        return res.status(200).json({
            totals: {
                customers: totalCustomers[0].totalCustomers || 0,
                withEmail: totalWithEmail[0].totalWithEmail || 0,
                withPhone: totalWithPhone[0].totalWithPhone || 0
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/search', isAuthorized, async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({ message: 'fill out missing fields' });
        }

        const [result] = await connect.query(
            `SELECT * FROM Customer
             WHERE Full_Name LIKE ?
             OR National_Id LIKE ?
             OR Phone LIKE ?
             OR Email LIKE ?
             OR Address LIKE ?`,
            [
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`
            ]
        );

        return res.status(200).json({
            message: 'Search results',
            result
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;