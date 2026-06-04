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

export default router;