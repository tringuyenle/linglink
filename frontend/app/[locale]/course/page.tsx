"use client"
import Image from "next/image"
import React, { useState } from "react"
import banner from "@/app/assets/images/course/courses_banner.png"
import { Input } from "@/components/ui/input"
import { FcSearch } from "react-icons/fc";
import Slider from 'rc-slider';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import 'rc-slider/assets/index.css';
import { FaFilter } from "react-icons/fa"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import CourseList from "./components/courseList"
import { Checkbox } from "@/components/ui/checkbox"

const Banner: React.FC = () => {
    return (
        <div className="w-full">
            <Image className="object-cover h-full w-full" src={banner} alt="banner" />
        </div>
    )
}

const Descrip: React.FC = () => {
    return (
        <div className="container mt-8">
            <h1 className="font-bold text-2xl mb-2">
                Khóa học
            </h1>
            <h2>
                Các khóa học được chuẩn bị bởi các giáo viên dày dặn kinh nghiệm, đảm bảo chất lượng. Cam kết mang lại hiệu quả tốt nhất cho học viên.
            </h2>
        </div>
    )
}

const Filter: React.FC = () => {
    const [range, setRange] = useState<any>([20, 80]);
    const [date, setDate] = useState<Date>()
    const handleRangeChange = (newRange: any) => {
        setRange(newRange);
    };
    return (
        <div className="mt-8 w-full bg-white rounded-md p-4 pb-8 shadow-lg sticky top-[100px]">
            <div className="w-full flex flex-col gap-6 justify-center items-center">
                <div className="w-full">
                    <div className="flex gap-3 items-center w-full relative">
                        <Input className="w-full" placeholder="Nhập tên khóa học muốn tìm" />
                        <FcSearch className="absolute right-2 -translate-y-1/2 top-1/2 cursor-pointer text-3xl hover:scale-125 transition duration-300" />
                    </div>
                </div>
                <div className="flex gap-3 items-center w-full justify-center">
                    <div className="flex items-center gap-2 font-medium">
                        <FaFilter />
                        Xếp theo
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn cách sắp xếp" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sắp xếp</SelectLabel>
                                <SelectItem value="price_down">Giá giảm dần</SelectItem>
                                <SelectItem value="price_up">Giá tăng dần</SelectItem>
                                <SelectItem value="student_down">Số học viên giảm dần</SelectItem>
                                <SelectItem value="student_up">Số học viên tăng dần</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[100%] flex items-center gap-4">
                    <div className="text-nowrap font-medium">
                        Lọc theo giá
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <Slider
                            min={0}
                            max={100}
                            defaultValue={[20, 80]}
                            range
                            onChange={handleRangeChange}
                        />
                        <div className="flex w-full justify-between text-sm">
                            <div>
                                Thấp: {range[0]}
                            </div>
                            <div>
                                Cao: {range[1]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="w-fit">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full my-2 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Chọn ngày bắt đầu học</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <h3 className="font-medium">Loại khóa học</h3>
                <div className="flex gap-3 items-center">
                    <Checkbox id="1" />
                    <label
                        htmlFor="1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        TOEIC
                    </label>
                </div>
                <div className="flex gap-3 items-center">
                    <Checkbox id="2" />
                    <label
                        htmlFor="2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        IELTS
                    </label>
                </div>
                <div className="flex gap-3 items-center">
                    <Checkbox id="3" />
                    <label
                        htmlFor="3"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        TOEFL
                    </label>
                </div>
            </div>
        </div>
    )
}

const Course: React.FC = () => {
    return (
        <div>
            <Banner />
            <Descrip />
            <div className="flex gap-6 container h-full">
                <div className="w-1/4 flex-1">
                    <Filter />
                </div>
                <div className="w-3/4 h-full">
                    <CourseList />
                </div>
            </div>
        </div>
    )
}

export default Course