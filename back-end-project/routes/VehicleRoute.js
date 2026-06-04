import connect from "../config/conn.js";
import express from "express";

const router = express.Router();

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

router.post('/addNew', isAuthorized, async (req, res) => {
    try {
        const {
            Plate_Number,
            Brand,
            Model,
            Year,
            Vehicle_Type,
            Purchase_Price,
            Status
        } = req.body;

        const user_id = req.session.user?.user_id;

        if (!user_id) {
            return res.status(401).json({ message: 'Login'});
        }
        if (!Plate_Number || !Brand || !Model || !Year || !Vehicle_Type || !Purchase_Price || !Status) {
            return res.status(400).json({ message: 'fill out missing fields' });
        }

        await connect.query(
            'INSERT INTO Vehicle (Plate_Number, Brand, Model, Year, Vehicle_Type, Purchase_Price, Status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [Plate_Number, Brand, Model, Year, Vehicle_Type, Purchase_Price, Status, user_id]
        );

        return res.status(201).json({ message: 'New Vehicle added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get('/list', isAuthorized, async (req, res) => {
    try {
        const [list] = await connect.query('SELECT * FROM Vehicle');

        if (list.length === 0) {
            return res.status(200).json({ message: 'No list in the system' });
        }

        return res.status(200).json({ message: 'List', list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get('/list/:Plate_Number', isAuthorized, async (req, res) => {
    try {
        const Plate_Number = req.params.Plate_Number;

        const [list] = await connect.query(
            'SELECT * FROM Vehicle WHERE Plate_Number = ?',
            [Plate_Number]
        );

        if (list.length === 0) {
            return res.status(200).json({ message: 'No list in the system' });
        }

        return res.status(200).json({ message: 'List', list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.put('/update/:Plate_Number', isAuthorized, async (req, res) => {
    try {
        const {
            Plate_Number,
            Brand,
            Model,
            Year,
            Vehicle_Type,
            Purchase_Price,
            Status
        } = req.body;

        let fields = [];
        let values = [];

        if (Plate_Number) {
            fields.push("Plate_Number = ?");
            values.push(Plate_Number);
        }

        if (Brand) {
            fields.push("Brand = ?");
            values.push(Brand);
        }

        if (Model) {
            fields.push("Model = ?");
            values.push(Model);
        }

        if (Year) {
            fields.push("Year = ?");
            values.push(Year);
        }

        if (Vehicle_Type) {
            fields.push("Vehicle_Type = ?");
            values.push(Vehicle_Type);
        }

        if (Purchase_Price) {
            fields.push("Purchase_Price = ?");
            values.push(Purchase_Price);
        }

        if (Status) {
            fields.push("Status = ?");
            values.push(Status);
        }

        values.push(req.params.Plate_Number);

        const sql = `UPDATE Vehicle SET ${fields.join(",")} WHERE Plate_Number = ?`;

        await connect.query(sql, values);

        return res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.delete('/delete/:Plate_Number', isAuthorized, async (req, res) => {
    try {
        const Plate_Number = req.params.Plate_Number;

        await connect.query(
            'DELETE FROM Vehicle WHERE Plate_Number = ?',
            [Plate_Number]
        );

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get('/report/totals', isAuthorized, async (req, res) => {
    try {
        const [totalVehicles] = await connect.query(
            `SELECT COUNT(*) AS totalVehicles FROM Vehicle`
        );

        const [availableVehicles] = await connect.query(
            `SELECT COUNT(*) AS availableVehicles FROM Vehicle WHERE Status = 'Available'`
        );

        const [rentedVehicles] = await connect.query(
            `SELECT COUNT(*) AS rentedVehicles FROM Vehicle WHERE Status = 'Rented'`
        );

        const [totalValue] = await connect.query(
            `SELECT SUM(Purchase_Price) AS totalValue FROM Vehicle`
        );

        return res.status(200).json({
            totals: {
                vehicles: totalVehicles[0].totalVehicles || 0,
                available: availableVehicles[0].availableVehicles || 0,
                rented: rentedVehicles[0].rentedVehicles || 0,
                totalValue: totalValue[0].totalValue || 0
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
            `SELECT * FROM Vehicle
             WHERE Plate_Number LIKE ?
             OR Brand LIKE ?
             OR Model LIKE ?
             OR Vehicle_Type LIKE ?
             OR Status LIKE ?`,
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

router.get('/report/recent-cars', isAuthorized, async (req, res) => {
    try {
        const [cars] = await connect.query(
            `SELECT 
                Plate_Number,
                Brand,
                Model,
                Year,
                Vehicle_Type,
                Status,
                Purchase_Price
             FROM Vehicle
             ORDER BY Year DESC
             LIMIT 5`
        );

        return res.status(200).json({
            message: 'Recent cars fetched successfully',
            cars
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;