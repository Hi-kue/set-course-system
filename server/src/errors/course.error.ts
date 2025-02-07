export const courseServiceErrorCodes = {
    COURSE_NOT_FOUND: "COURSE_NOT_FOUND",
    COURSE_INVALID: "COURSE_INVALID",
    COURSE_FIELD_MISSING: "COURSE_FIELD_MISSING",
    COURSE_ALREADY_EXISTS: "COURSE_ALREADY_EXISTS",
    COURSE_CREATE_FAILED: "COURSE_CREATE_FAILED",
    COURSE_RETRIEVE_FAILED: "COURSE_RETRIEVE_FAILED",
    COURSE_UPDATE_FAILED: "COURSE_UPDATE_FAILED",
    COURSE_DELETE_FAILED: "COURSE_DELETE_FAILED",
}

export class CourseServiceError extends Error {
	constructor(
		message: string,
		public code: string,
		public details?: any,
	) {
		super(message);
	}
}
