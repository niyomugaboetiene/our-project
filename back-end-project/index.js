import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true, 
    cookie: { httpOnly: true }
}));

app.listen(5000, () => {
    console.log("http://localhost:5000");
})