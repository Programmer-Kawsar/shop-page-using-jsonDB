import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import allproduct from "./routes/productsRoutes.js";
import EJSLayouts from "express-ejs-layouts";

// dotenv.config
dotenv.config();
// port setup
const PORT = process.env.PORT || 5030;

// express setup
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// ejs setup

app.set("view engine", "ejs")
 app.use(EJSLayouts);



// routes

app.use(allproduct);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
})