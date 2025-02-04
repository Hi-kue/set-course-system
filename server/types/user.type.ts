export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export interface IUser extends Document {
    name?: string | null;
    email: string;
    password: string;
    role: UserRole;
}


export interface IUserMethods {
    
}