import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:ecommercepass@cluster0.apjhgah.mongodb.net/cluster0")

app.listen(PORT, () => console.log(`Server is litening to port: ${PORT}`));
