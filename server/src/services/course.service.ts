import logger from "../utils/logger.js";
import { prisma } from "../utils/prisma.js";
import { Prisma, Course } from "@prisma/client";
import { CourseServiceError, courseServiceErrorCodes } from "../errors/course.error.js";

class CourseService {
	private static validateCourseObject(course: Partial<Course>): boolean {
		const requiredFields = [...Object.keys(course)];
		for (const field of requiredFields) {
			if (!(field in course)) {
				throw new CourseServiceError(
					`The field ${field} is required`,
					courseServiceErrorCodes.COURSE_FIELD_MISSING
				);
			}
		}
		return true;
	}

	private static async validateCourseId(courseId: string): Promise<boolean> {
		try {
			await prisma.course.findUniqueOrThrow({
				where: { id: courseId },
			});
			return true;
		} catch (error) {
			throw new CourseServiceError(
				`The course with the ID ${courseId} does not exist`,
				courseServiceErrorCodes.COURSE_NOT_FOUND,
				error,
			);
		}
	}

	static async createCourse(course: Omit<Course, "id">): Promise<Course> {
		try {
			this.validateCourseObject(course);
			const newCourse = await prisma.course.create({
				data: course,
			});
			logger.info(`Created course with ID: ${newCourse.id}`);
			return newCourse;
		} catch (error) {
			logger.error("Error creating course:", error);
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2002") {
					throw new CourseServiceError(
						`A course with the provided ${course.courseCode} already exists.`,
						courseServiceErrorCodes.COURSE_ALREADY_EXISTS,
						error,
					);
				}
			}

			throw new CourseServiceError(
				"The course could not be created",
				courseServiceErrorCodes.COURSE_CREATE_FAILED,
				error,
			);
		}
	}

	static async getCourseById(courseId: string): Promise<Course | null> {
		try {
			const course = await prisma.course.findUnique({
				where: { id: courseId },
				include: { enrollments: true },
			});
			if (!course) {
				logger.warn(`Course with ID ${courseId} not found`);
				return null;
			}
			return course;

		} catch (error) {
			logger.error(`Error retrieving course with ID ${courseId}:`, error);
			throw new CourseServiceError(
				`Failed to retrieve course with ID ${courseId}`,
				courseServiceErrorCodes.COURSE_RETRIEVE_FAILED,
				error,
			);
		}
	}

	static async updateCourse(
		courseId: string,
		newCourse: Partial<Course>,
	): Promise<Course> {
		try {
			await this.validateCourseId(courseId);
			const course = await prisma.course.update({
				where: { id: courseId },
				data: newCourse,
			});
			logger.info(`Updated course with ID: ${courseId}`);
			return course;

		} catch (error) {
			logger.error(`Error updating course with ID ${courseId}:`, error);
			if (error instanceof CourseServiceError) {
				throw error;
			}
			throw new CourseServiceError(
				`Failed to update course with ID ${courseId}`,
				courseServiceErrorCodes.COURSE_UPDATE_FAILED,
				error,
			);
		}
	}

	static async deleteCourse(courseId: string): Promise<Course> {
		try {
			await this.validateCourseId(courseId);
			const course = await prisma.course.delete({
				where: { id: courseId },
			});
			logger.info(`Deleted course with ID: ${courseId}`);
			return course;
		} catch (error) {
			logger.error(`Error deleting course with ID ${courseId}:`, error);
			if (error instanceof CourseServiceError) {
				throw error;
			}
			throw new CourseServiceError(
				`Failed to delete course with ID ${courseId}`,
				courseServiceErrorCodes.COURSE_DELETE_FAILED,
				error,
			);
		}
	}

	static async getCourseStudents(courseId: string) {
		try {
			await this.validateCourseId(courseId);
			const enrollments = await prisma.enrollment.findMany({
				where: { courseId },
				include: { student: true },
			});
			return enrollments;
		} catch (error) {
			logger.error(`Error retrieving students for course ${courseId}:`, error);
			if (error instanceof CourseServiceError) {
				throw error;
			}

			throw new CourseServiceError(
				`Failed to retrieve students for course with ID ${courseId}`,
				courseServiceErrorCodes.COURSE_RETRIEVE_FAILED,
				error,
			);
		}
	}

	static async getCourseEnrollments(courseId: string) {
		try {
			await this.validateCourseId(courseId);
			const enrollments = await prisma.enrollment.findMany({
				where: { courseId },
				include: { student: true },
			});
			return enrollments;
		} catch (error) {
			logger.error(
				`Error retrieving enrollments for course ${courseId}:`,
				error,
			);
			
			if (error instanceof CourseServiceError) {
				throw error;
			}

			throw new CourseServiceError(
				`Failed to recieve enrollments for course with ID ${courseId}`,
				courseServiceErrorCodes.COURSE_RETRIEVE_FAILED,
				error,
			);
		}
	}
}

export default CourseService;