import { Schema, model } from "mongoose";

export interface IUser {
    _id?: string;
    username: string;
    password: string;
    avaliableMoney: number;
    purchasedItems: string[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avaliableMoney: { type: Number, default: 5000 },
    purchasedItems: [
        { type: Schema.Types.ObjectId, ref: "product", default: [] },
    ],
});

export const UserModel = model<IUser>("user", UserSchema);
