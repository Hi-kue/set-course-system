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
};

const programs = getProgramsFromJson();
export type Programs = (typeof programs)[number];

export type StudentResponse = {
	// TODO: Implement StudentResponse type.
};
