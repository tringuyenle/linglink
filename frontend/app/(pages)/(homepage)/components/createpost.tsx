"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { FaRegImages } from "react-icons/fa6";
import { BsPatchQuestionFill } from "react-icons/bs";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";

export default function CreatePost() {
    const [input, setInput] = useState<string>('')
    const onEmojiClick = (emojiObject: any, event: any) => {
        setInput((prevInput) => prevInput + emojiObject.emoji);
    };
    return (
        <div className="bg-background rounded-md px-6 pt-3 py-6">
            <div className="flex flex-row gap-3">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Sheet>
                    <SheetTrigger asChild>
                        <div className="bg-gray-100 hover:bg-slate-200 transition duration-300 cursor-pointer w-full rounded-2xl p-3 text-gray-400">
                            A à, Bạn đang nghĩ gì thế ?
                        </div>
                    </SheetTrigger>
                    <SheetContent side="top">
                        <SheetHeader>
                            <SheetTitle>Tạo bài viết mới</SheetTitle>
                            <SheetDescription>
                                Bạn muốn tạo bài viết gì ?
                            </SheetDescription>
                        </SheetHeader>
                        <div className="">
                            <div className="flex flex-col gap-2 my-4">
                                <Label htmlFor="word" className="text-left">
                                    Nội dung
                                </Label>
                                <Textarea id="word" placeholder='' onChange={(event) => setInput(event.target.value)} value={input} className="col-span-3">
                                </Textarea>
                                <div className="w-full justify-end flex">
                                    <Popover modal={true}>
                                        <PopoverTrigger>
                                            <Button variant="outline"><MdOutlineEmojiEmotions className="text-2xl" /></Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="overflow-auto">
                                            <EmojiPicker width="100%" onEmojiClick={onEmojiClick} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Tạo bài viết</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
            <hr className="h-[1px] mt-5 bg-gray-400"></hr>
            <div className="flex justify-between mt-4">
                <div className="basis-1/2 flex items-center gap-2 justify-center w-full hover:bg-slate-200 py-2 rounded-lg cursor-pointer transition duration-300">
                    <FaRegImages className="text-green-500 text-2xl" />
                    <div className="font-medium text-slate-400">
                        Tải ảnh lên
                    </div>
                </div>
                <div className="basis-1/2 flex items-center gap-2 justify-center w-full  hover:bg-slate-200 py-2 rounded-lg cursor-pointer transition duration-300">
                    <BsPatchQuestionFill className="text-yellow-500 text-2xl" />
                    <div className="font-medium text-slate-400">
                        Đặt câu hỏi
                    </div>
                </div>
            </div>
        </div>
    )
}