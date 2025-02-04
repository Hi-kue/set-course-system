import { prisma } from '../utils/prisma';
import type { Course } from '@prisma/client';

export class CourseService {
  static async createCourse(courseData: Omit<Course, 'id'>) {
    return prisma.course.create({
      data: courseData
    });
  }

  static async getCourseById(courseId: string) {
    return prisma.course.findUnique({
      where: { id: courseId },
      include: { enrollments: true }
    });
  }

  static async updateCourse(courseId: string, updateData: Partial<Course>) {
    return prisma.course.update({
      where: { id: courseId },
      data: updateData
    });
  }

  static async deleteCourse(courseId: string) {
    return prisma.course.delete({
      where: { id: courseId }
    });
  }

  static async getCourseStudents(courseId: string) {
    return prisma.enrollment.findMany({
      where: { courseId },
      include: { student: true }
    });
  }
}
