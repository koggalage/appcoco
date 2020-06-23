import { Role } from "./role";

export class User {
    id: number;
    userName: string;
    password: string;
    //firstName: string;
    //lastName: string;
    fullName: string;
    userType: Role;
    token?: string;
}