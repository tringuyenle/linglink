import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseProps } from 'schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<{ courses: Course[], pageSize: number, totalPage: number }> {
    const skip = (page - 1) * limit;
    const totalCourses = await this.courseModel.countDocuments();
    const totalPages = Math.ceil(totalCourses / limit);
    const courses = await this.courseModel.find().skip(skip).limit(limit).exec();

    return {
        courses,
        pageSize: limit,
        totalPage: totalPages
    };
}

  async findById(id: string): Promise<Course | null> {
    return this.courseModel.findById(id).exec();
  }

  async create(courseProps: CourseProps): Promise<Course> {
    const createdCourse = new this.courseModel(courseProps);
    console.log(courseProps)
    return createdCourse.save();
  }

  async update(id: string, courseProps: CourseProps): Promise<Course | null> {
    return this.courseModel.findByIdAndUpdate(id, courseProps, { new: true }).exec();
  }

  async delete(id: string): Promise<Course | null> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
}
