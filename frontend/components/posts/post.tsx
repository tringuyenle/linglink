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
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Header = ({ user }: { user: any }) => {
    return (
        <div className="flex flex-row justify-between px-6 items-center">
            <div className="flex flex-row items-center gap-3">
                <div>
                    <Avatar>
                        <AvatarImage src={user.avatar} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className="font-semibold">
                        {user.name}
                    </div>
                    <div className="text-stone-500 text-sm">
                        {user.createAt}
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

const Body = ({ content }: { content: any }) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="px-6">
                {content.content}
            </div>
            {
                content.imgs_url &&
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    navigation={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {
                        content.imgs_url && content.imgs_url.map((img: any, index: any) => (
                            <SwiperSlide className="!flex justify-center" key={index}>
                                <Image className="w-fit h-auto max-h-[500px]" height={0} width={0} src={img} alt="illustration" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
            {
                content.question !== null &&
                <div>
                    <div className="px-6 text-lg font-semibold mb-4">
                        Câu hỏi: {content.question.content}
                    </div>
                    <div className="px-6 grid grid-cols-2 gap-3">
                        {
                            content.question.answers.map((answer: any, idx: any) => {
                                return (
                                    <div className="w-full" key={idx}>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <div className="w-full transition duration-300 hover:scale-[1.05] hover:bg-slate-200 cursor-pointer rounded-md border border-ring p-2 flex justify-center" key={idx}>
                                                    {answer}
                                                </div>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>{`Đáp án câu hỏi là: ${content.question.answers[content.question.key]}`}</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        {idx === content.question.key ? "Chúc mừng bạn trả lời đúng" : "Bạn đã trả lời sai, đừng nản chí, hãy thử lại"}
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                                                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div >
    )
}

export const Post = ({ data }: { data: any }) => {
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
            <Header user={data.author} />
            <Body content={data} />
            <div className="px-6">
                <div className="flex flex-row gap-1">
                    <div className="flex flex-row gap-2 items-center text-sm p-2">
                        <Image src={like} alt="like" width={18} height={18} />
                        {data.upVotes}
                    </div>
                    <div className="flex flex-row gap-2 items-center text-sm p-2">
                        <Image src={dislike} alt="dislike" width={18} height={18} />
                        {data.downVotes}
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
                                    <Header user={data.author} />
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
                                            comments && comments.map((comment: any, index: any) => {
                                                return (
                                                    <Comment props={comment} key={index} />
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