import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const PORT = 3001;
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/products", productRouter);

mongoose
    .connect(
        "mongodb+srv://admin:ecommercepass@cluster0.apjhgah.mongodb.net/cluster0"
    )
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () =>
            console.log(`Server is listening on port: ${PORT}`)
        );
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
