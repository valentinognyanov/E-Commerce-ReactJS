import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../errors";

const router = Router();
router.post("/register", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user: IUser = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({ type: UserErrors.USERNAME_EXISTS });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPass });
        await newUser.save();

        res.json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ type: error });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user: IUser = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
        }

        const isPassValid = await bcrypt.compare(password, user.password);

        if (!isPassValid) {
            return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
        }

        const token = jwt.sign({ id: user._id }, "secret");
        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ type: error });
    }
});

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }

    return res.sendStatus(401);
};
export { router as userRouter };
