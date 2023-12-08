import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/product", productRouter);

mongoose.connect(
    "mongodb+srv://admin:ecommercepass@cluster0.apjhgah.mongodb.net/cluster0"
);

app.listen(PORT, () => console.log(`Server is litening to port: ${PORT}`));
