"use client"
import { useState, useEffect } from "react";
import logo from "@/app/assets/images/linglink.png"
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoNotifications } from "react-icons/io5";
import { ImHome } from "react-icons/im";
import { GiBookshelf } from "react-icons/gi";
import { GiCardExchange } from "react-icons/gi";
import { PiExam } from "react-icons/pi";
import { GrSchedules } from "react-icons/gr";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Chỉ kích hoạt sticky khi scroll xuống đủ một khoảng cụ thể, ví dụ: 100px
            setIsSticky(scrollPosition > 80);
        };

        // Thêm sự kiện lắng nghe scroll
        window.addEventListener('scroll', handleScroll);

        // Xóa sự kiện khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div
            className={`mb-5 h-full rounded-md w-full container flex flex-row gap-12 justify-between items-center relative z-10 shadow-md bg-background ${isSticky ? 'sticky top-0 animate-slide-down' : 'animate-slide-up'
                }`}
        >
            <div className="flex flex-row gap-2 items-center py-4 basis-1/4">
                <div>
                    <Image className="h-[50px] w-[50px]" src={logo} alt="logo" />
                </div>
                <div className="text-3xl font-semibold text-active">
                    Ling Link
                </div>
            </div>
            <div className="basis-1/2">
                <div className="grid grid-cols-5 items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex justify-center h-full px-4 py-2 text-active hover:bg-slate-200 rounded-md">
                                    <Link href="/">
                                        <ImHome className="text-2xl" />
                                    </Link>
                                </div>
                                <div className="w-full border-b-4 border-active"></div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Home</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex justify-center h-full px-4 py-2 border-active text-active border-b-0 hover:bg-slate-200 rounded-md">
                                    <Link href="/">
                                        <GiBookshelf className="text-2xl" />
                                    </Link>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Danh sách khóa học</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex justify-center h-full px-4 py-2 border-active text-active border-b-0 hover:bg-slate-200 rounded-md">
                                    <Link href="/">
                                        <GiCardExchange className="text-2xl" />
                                    </Link>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Flashcard</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex justify-center h-full px-4 py-2 border-active text-active border-b-0 hover:bg-slate-200 rounded-md">
                                    <Link href="/">
                                        <PiExam className="text-2xl" />
                                    </Link>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Làm đề thi</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex justify-center h-full px-4 py-2 border-active text-active border-b-0 hover:bg-slate-200 rounded-md">
                                    <Link href="/">
                                        <GrSchedules className="text-2xl" />
                                    </Link>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Thời khóa biểu</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="flex gap-6 py-4 basis-1/4 justify-end">
                <div className="relative flex items-center">
                    <IoNotifications className="text-2xl" />
                    <span className="w-[10px] absolute right-0 top-[5px] h-[10px] rounded-full bg-red-500"></span>
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}