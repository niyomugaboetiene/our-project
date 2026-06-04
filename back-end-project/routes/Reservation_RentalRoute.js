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
        // 	Reservation_Date	Start_Date	End_Date	Reservation_Status	Rental_Date	Return_Date	Rental_Fee	Rental_Status	id	customer_nationa_id	plate_number	user_id
        const {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } = req.body;

        if (!Reservation_Date || !Start_Date ||!End_Date || !Reservation_Status || !Rental_Date	|| !Return_Date	|| !Rental_Fee	 || !Rental_Status || !customer_nationa_id || !plate_number) {
            return res.status(400).json({ message: 'fill out missing fields' });
        }


        const user_id = req.session.user.user_id;
        
        await connect.query(
            `INSERT INTO Reservation_Rental (Reservation_Date, Start_Date, End_Date, Reservation_Status, Rental_Date,	Return_Date, Rental_Fee, Rental_Status, customer_nationa_id, plate_number, user_id)
             VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number, user_id]
        );

        return res.status(201).json({ message: 'New Reservation_Rental added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.get('/list', isAuthorized, async (req, res) => {
    try {
        const [list] = await connect.query('SELECT * FROM Reservation_Rental');

        if (list.length === 0) {
            return res.status(200).json({ message: 'No list in the system' });
        }


        return res.status(200).json({ message:' List', list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});


router.get('/list/:id', isAuthorized, async (req, res) => {
    try {
        const id = req.params.id;

        const [list] = await connect.query('SELECT * FROM Reservation_Rental WHERE id = ?', [id]);

        if (list.length === 0) {
            return res.status(200).json({ message: 'No list in the system' });
        }

        return res.status(200).json({ message:' List', list: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

router.put('/update/:id', isAuthorized, async (req, res) => {
   try {
     const { Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } = req.body;

     const user = req.session.user.user_id;
     const id = req.params.id;
    let fields = [];
    let values = [];

    if (Reservation_Date) {
        fields.push("Reservation_Date = ?");
        values.push(Reservation_Date);
    }
    
    if (Start_Date) {
        fields.push("Start_Date = ?");
        values.push(Start_Date);
    }
    
    if (End_Date) {
        fields.push("End_Date = ?");
        values.push(End_Date);
    }
    
    if (Reservation_Status) {
        fields.push("Reservation_Status = ?");
        values.push(Reservation_Status);
    }
    
    if (Rental_Date) {
        fields.push("Rental_Date = ?");
        values.push(Rental_Date);
    }
      //  const { Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } = req.body;
    if (Rental_Date) {
        fields.push("Rental_Date = ?");
        values.push(Rental_Date);
    }
    
    if (Return_Date) {
        fields.push("Return_Date = ?");
        values.push(Return_Date);
    }
    
    if (Rental_Fee) {
        fields.push("Rental_Fee = ?");
        values.push(Rental_Fee);
    }
    
    if (Rental_Status) {
        fields.push("Rental_Status = ?");
        values.push(Rental_Status);
    }
    
    if (customer_nationa_id) {
        fields.push("customer_nationa_id = ?");
        values.push(customer_nationa_id);
    }
    
    if (plate_number) {
        fields.push("plate_number = ?");
        values.push(plate_number);
    }    

    if (user) {
        fields.push("user_id = ?");
        values.push(user);
    }

    values.push(id);

    const sql = `UPDATE Reservation_Rental SET ${fields.join(",")} WHERE id = ?`
    await connect.query(sql, values);

    return res.status(200).json({ message: 'Updated successfully'})
   } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error'});
   }
});


router.delete('/delete/:id', isAuthorized, async (req, res) => {
    try {
        const id = req.params.id;

        await connect.query(
            'DELETE FROM Reservation_Rental WHERE id = ?', [id]
        );

        return res.status(200).json({ message: 'Deleted successfully '});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
    }
});

export default router;