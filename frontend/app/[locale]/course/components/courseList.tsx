import { courses } from "@/app/constants";
import CourseCard, { CourseCardProps } from "./course";

export default function CourseList() {
    return (
        <div className="mt-8 grid grid-cols-3 gap-4">
            {
                courses.map((item: CourseCardProps, idx: number) => (
                    <CourseCard course={item} key={idx} />
                ))
            }
        </div>
    )
}