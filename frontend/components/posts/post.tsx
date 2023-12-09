"use client"
import React from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { TfiMoreAlt } from "react-icons/tfi";
import Image from "next/image";
import dislike from "@/app/assets/images/3670156.png"
import like from "@/app/assets/images/download.svg"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaRegComment } from "react-icons/fa";
import Comment from "../comments/comment";

const Header = () => {
    return (
        <div className="flex flex-row justify-between px-6 items-center">
            <div className="flex flex-row items-center gap-3">
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className="font-semibold">
                        Name AAAAAAAAA
                    </div>
                    <div className="text-stone-500 text-sm">
                        12/12/2023 15:40
                    </div>
                </div>
            </div>
            <div>
                <div className="rounded-full p-1 flex items-center hover:bg-secondary cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <TfiMoreAlt className="text-xl text-slate-600" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem>Xóa</DropdownMenuItem>
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

const Body = ({ content }: { content: string }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="px-6">
                Vui ghê 🐧{content}
            </div>
            <Image className="w-auto h-auto" width={0} height={0} alt="ảnh" src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/405331513_741887607984038_8626028128028410582_n.jpg?stp=dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeFKR8wjt_qdaEL5KUk98E9G33_naizs8_Dff-dqLOzz8HrkCNmXxkflAEUTIH6m37_zA-qmy4pTPkVO-TJFhk--&_nc_ohc=Px6GGQUkIFoAX_9lY_6&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfD08DC5eviOawbveeTJxW5tsxcZq-MpQiMS8ykLrIxEmQ&oe=6573FED3" />
        </div>
    )
}

export const Post = ({ data }: { data: string }) => {
    let comments = [{
        avatar: "https://github.com/shadcn.png",
        name: "Lâm Điền Chinh",
        date: "12/09/2023 1:46 pm",
        content: "Đáp án A đúng hơn"
    },
    {
        avatar: "https://github.com/shadcn.png",
        name: "Lâm Điền Chinh",
        date: "12/09/2023 1:50 pm",
        content: "Đáp án B đúng hơn"
    }]
    return (
        <div className="py-2 shadow-md rounded-md w-full bg-background flex flex-col gap-3">
            <Header />
            <Body content={data} />
            <div className="px-6">
                <div className="flex flex-row gap-1">
                    <div className="flex flex-row gap-2 items-center text-sm p-2">
                        <Image src={like} alt="like" width={18} height={18} />
                        332
                    </div>
                    <div className="flex flex-row gap-2 items-center text-sm p-2">
                        <Image src={dislike} alt="dislike" width={18} height={18} />
                        20
                    </div>
                </div>
                <hr className="h-[1px] bg-slate-200" />
                <div className="flex flex-row justify-between py-2">
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-row gap-2 items-center text-sm hover:bg-secondary rounded-md cursor-pointer p-2">
                            <Image src={like} alt="like" width={18} height={18} />
                            Thích
                        </div>
                        <div className="flex flex-row gap-2 items-center text-sm hover:bg-secondary rounded-md cursor-pointer p-2">
                            <Image src={dislike} alt="dislike" width={18} height={18} />
                            Không thích
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center text-sm hover:bg-secondary rounded-md cursor-pointer p-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex gap-2 items-center">
                                    <FaRegComment />
                                    Bình luận
                                </div>
                            </DialogTrigger>
                            <DialogContent className="overflow-y-scroll max-h-[600px] max-w-[600px] p-0">
                                <div className="flex flex-col gap-3 mt-8">
                                    <Header />
                                    <Body content={data} />
                                    <div className="flex justify-between">
                                        <div className="flex flex-row gap-6 px-6">
                                            <div className="flex flex-row gap-2 items-center text-sm hover:bg-secondary rounded-md cursor-pointer p-2">
                                                <Image src={like} alt="like" width={18} height={18} />
                                                Thích
                                            </div>
                                            <div className="flex flex-row gap-2 items-center text-sm hover:bg-secondary rounded-md cursor-pointer p-2">
                                                <Image src={dislike} alt="dislike" width={18} height={18} />
                                                Không thích
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 flex flex-col gap-3">
                                        {
                                            comments && comments.map((data: any, index: any) => {
                                                return (
                                                    <Comment props={data} key={index} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}