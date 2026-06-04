import express from "express";
import cors from "cors";
import session from "express-session";

import CustomerRouter from "./routes/CustomerRoute.js";
import ReservationRentalRouter from "./routes/Reservation_RentalRoute.js";
import UserRoute from "./routes/UserRoute.js";
import VehicleRoute from "./routes/VehicleRoute.js";


const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true, 
    cookie: { httpOnly: true }
}));

app.use('/customer', CustomerRouter);
app.use("/reservation", ReservationRentalRouter);
app.use('/auth', UserRoute);
app.use('/vehicle', VehicleRoute);

app.listen(5000, () => {
    console.log("http://localhost:5000");
})