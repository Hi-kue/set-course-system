import { Schema, model, connect } from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface IUserMethods {
    verifyPassword(password: string): Promise<boolean>;
    comparePassword(password: string): Promise<boolean>;
    generatePasswordHash(password: string): Promise<string>;
    generateJWT(): Promise<string>;
    updatePassword(password: string): Promise<void>;
    delete(): Promise<void>;
}

const userSchema = new Schema<IUser>({
    name: { 
        type: String, 
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true, 
    },
    role: { 
        type: String, 
        required: true,
        default: "user"
    },
}, {
    timestamps: true
});

const User = model<IUser>("User", userSchema);

export {
    User,
    IUserMethods
}
