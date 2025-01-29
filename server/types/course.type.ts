import fs from "fs";
import path from "path";

const COURSE_CODES_JSON_PATH = path.resolve(__dirname, "../../data/courseCodes.json");
export const getCourseCodesFromJson = (): string[] => {
    try {
        const data = fs.readFileSync(COURSE_CODES_JSON_PATH, "utf-8");
        const courseCodes = JSON.parse(data);
        return courseCodes;

    } catch (error) {
        console.error("Error reading course codes for JSON file: ", error);
        return [];

    }
}


const courseCode  = getCourseCodesFromJson();
export type CourseSection = typeof courseCode[number];


export interface ICourse {
    courseCode: string;
    courseName: string;
    courseSection: CourseSection;
    students: string[];
}


// ANCHOR: What's the point of this interface?
export interface ICourseWithId extends ICourse {
    _id: string;
}