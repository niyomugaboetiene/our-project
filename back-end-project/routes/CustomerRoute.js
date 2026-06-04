import connect from "../config/conn.js";
import express from "express";

const router = express.Router();

router.post('/addNew', async (req, res) => {
    try {
        // 	Full_Name	National_Id	Phone	Email	Address
        const {	Full_Name, National_Id,	Phone,	Email,	Address } = req.body;

        if (!Full_Name || !National_Id || !Phone || !Email || !Address) {
            return res.status(400).json({ message: 'fill out missing fields' });
        }

        if (National_Id !== 16) {
            return res.status(400).json({ message: 'National Id  must be in 16 numbers'})
        }
        await connect.query(
            'INSERT INTO Customer (Full_Name, National_Id,	Phone,	Email,	Address) VALUES(?, ?, ?, ?, ?)', 
            [Full_Name, National_Id,	Phone,	Email,	Address]
        );

        return res.status(201).json({ message: 'New Customer added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get('/list', async (req, res) => {
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


router.get('/list/:National_Id', async (req, res) => {
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

router.put('/update/:National_Id', async (req, res) => {
   try {
        const {	Full_Name, National_Id,	Phone,	Email,	Address } = req.body;

    let fields = [];
    let values = [];

    if (Full_Name) {
        fields.push("Full_Name = ?");
        values.push(Full_Name);
    }
    
    if (National_Id) {
        fields.push("National_Id = ?");
        values.push(National_Id);
    }
    
    if (Phone) {
        fields.push("Phone = ?");
        values.push(Phone);
    }
    
    if (Email) {
        fields.push("Email = ?");
        values.push(Email);
    }
    
    if (Address) {
        fields.push("Address = ?");
        values.push(Address);
    }

    values.push(National_Id);

    const sql = `UPDATE Customer SET ${fields.join(",")} WHERE National_Id = ?`
    await connect.query(sql, values);

    return res.status(200).json({ message: 'Updated successfully'})
   } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error'});
   }
});


router.delete('/delete/:National_Id', async (req, res) => {
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

export default router;