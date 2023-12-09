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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function CreatePost() {
    const [input, setInput] = useState<string>('')
    const onEmojiClick = (emojiObject: any, event: any) => {
        setInput((prevInput) => prevInput + emojiObject.emoji);
    };
    const [myFile, setMyFile] = useState([]);
    const onDrop = useCallback(
        (acceptedFiles: any) => {
            setMyFile(acceptedFiles);
        },
        [myFile]
    );
    const { getRootProps: imageroot, getInputProps: image_inputprops } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        },
        // maxFiles: 1,
        onDrop: onDrop
    });
    const removeFile = (filePath: string) => {
        const updatedFiles = myFile.filter((file: any) => file.path !== filePath);
        setMyFile(updatedFiles);
    }
    const files_image = myFile.map((file: any) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            < li key={file.path} className="border-2 w-full px-4 py-3 flex flex-col gap-1 justify-between items-center rounded-md text-xs">
                <Image width={0} height={0} src={imageUrl} alt={file.name} className="h-full max-h-[120px] w-full" />
                {file.path} - {file.size} bytes
                <Button onClick={() => removeFile(file.path)}>
                    Delete
                </Button>
            </li >
        )
    }
    );
    const [answers, setAnswers] = useState(['', '']); // State để theo dõi danh sách đáp án

    // Hàm thêm đáp án mới
    const addAnswer = () => {
        if (answers.length < 4) {
            setAnswers([...answers, '']);
        }
    };

    // Hàm xóa đáp án
    const removeAnswer = (index: any) => {
        const newAnswers = [...answers];
        newAnswers.splice(index, 1);
        setAnswers(newAnswers);
    };

    // Hàm xử lý thay đổi giá trị của một ô điền đáp án
    const handleAnswerChange = (index: any, value: any) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };
    const listanswer = ['A', 'B', 'C', 'D']
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
                    <SheetContent className="overflow-y-scroll max-h-screen" side="top">
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
                                <div className="w-full justify-between flex">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Thêm câu hỏi</Button>
                                        </DialogTrigger>
                                        <DialogContent className="overflow-y-scroll max-h-screen max-w-[800px]">
                                            <DialogHeader>
                                                <DialogTitle>Thêm câu hỏi</DialogTitle>
                                                <DialogDescription>
                                                    Tạo quiz bằng cách điền form bên dưới
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="question" className="text-right">
                                                        Câu hỏi
                                                    </Label>
                                                    <Input
                                                        id="question"
                                                        placeholder="Viết câu hỏi"
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="audio" className="text-right">
                                                        File ghi âm (nếu có):
                                                    </Label>
                                                    <Input
                                                        type="file"
                                                        id="audio"
                                                        placeholder="Chọn file ghi âm"
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Chọn đáp án</Label>
                                                    <Select>
                                                        <SelectTrigger className="w-[200px] mt-2">
                                                            <SelectValue placeholder="Chọn đáp án" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Chọn đáp án của đề bài</SelectLabel>
                                                                <SelectItem value="A">Apple</SelectItem>
                                                                <SelectItem value="B">Banana</SelectItem>
                                                                <SelectItem value="C">Blueberry</SelectItem>
                                                                <SelectItem value="D">Grapes</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <div className="flex flex-col gap-2 my-4">
                                                        {answers.map((answer, index) => (
                                                            <div className="flex gap-4 items-center" key={index}>
                                                                <div className="font-bold">
                                                                    {listanswer[index]}.
                                                                </div>
                                                                <Input
                                                                    type="text"
                                                                    value={answer}
                                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                                />
                                                                {/* Hiển thị select chọn đáp án */}
                                                                {/* Nút xóa đáp án */}
                                                                <Button onClick={() => removeAnswer(index)}>Xóa</Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Nút thêm đáp án */}
                                                <Button onClick={addAnswer}>Thêm câu trả lời</Button>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Tạo câu hỏi</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
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
                            <div className="text-md font-semibold">Hình Ảnh</div>
                            <div {...imageroot({ className: 'dropzone py-5 px-3 border border-ring flex justify-center border-dashed cursor-pointer rounded-md' })}>
                                <input {...image_inputprops()} />
                                <div className="flex flex-col gap-2 items-center justify-center">
                                    <p className="text-4xl font-medium">+</p>
                                    <div>
                                        Thêm ảnh bằng cách nhấn chọn hoặc kéo thả
                                    </div>
                                </div>
                            </div>
                            <aside className="mt-2">
                                <ul className="grid grid-cols-6 gap-4">{files_image}</ul>
                            </aside>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button className="mt-2" type="submit">Tạo bài viết</Button>
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