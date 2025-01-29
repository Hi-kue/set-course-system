import fs from "fs";
import path from "path";


const PROGRAMS_JSON_PATH = path.resolve(__dirname, "../../data/programs.json");
export const getProgramsFromJson = (): string[] => {
    try {
        const data = fs.readFileSync(PROGRAMS_JSON_PATH, "utf-8");
        const programs = JSON.parse(data);
        return programs;

    } catch (error) {
        console.error("Error reading programs for JSON file: ", error);
        return [];

    }
}


const programs = getProgramsFromJson();
export type Programs = typeof programs[number];


export type FullName =  {
    firstName: string;
    middleName?: string;
    lastName: string;
}


export interface IStudent {
    studentNumber: string;
    password: string;
    fullName: FullName;
    address: string;
    city: string;
    phoneNumber: string;
    email: string;
    program: Programs;
}


// ANCHOR: What's the point of this interface?
export interface IStudentWithId extends IStudent {
    _id: string;
}