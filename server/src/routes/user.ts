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
        res.json({ token, userID: user._id });
    } catch (error) {
        res.status(500).json({ type: error });
    }
});

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader?.split(" ")[1];

    try {
        await jwt.verify(token, "secret");
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ error: "Forbidden" });
    }
};

router.get(
    "/avaliable-money/:userID",
    verifyToken,
    async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                res.status(400).json({ type: UserErrors.NO_USER_FOUND });
            }

            res.json({ avaliableMoney: user.avaliableMoney });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
);

export { router as userRouter };
