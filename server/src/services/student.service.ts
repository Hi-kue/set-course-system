import { prisma } from '../utils/prisma';
import type { Student } from '@prisma/client';

export class StudentService {
  static async createStudent(studentData: Omit<Student, 'id'>) {
    return prisma.student.create({
      data: studentData
    });
  }

  static async getStudentById(studentId: string) {
    return prisma.student.findUnique({
      where: { id: studentId },
      include: { enrollments: true }
    });
  }

  static async updateStudent(studentId: string, updateData: Partial<Student>) {
    return prisma.student.update({
      where: { id: studentId },
      data: updateData
    });
  }

  static async deleteStudent(studentId: string) {
    return prisma.student.delete({
      where: { id: studentId }
    });
  }

  static async getStudentCourses(studentId: string) {
    return prisma.enrollment.findMany({
      where: { studentId },
      include: { course: true }
    });
  }
}
