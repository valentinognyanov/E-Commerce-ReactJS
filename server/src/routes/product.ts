import { Router, Request, Response, NextFunction } from "express";

import { IProduct, ProductModel } from "../models/product";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({});
        res.json({ products });
    } catch (error) {
        res.status(400).json({ error });
    }
});

export { router as productRouter };
