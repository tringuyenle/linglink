"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
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
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import createAxiosInstance from '@/app/utils/axiosInstance';
import { toast } from 'react-toastify';
import { Textarea } from '../ui/textarea';


export default function FlashCardCreate() {
    const sliderRef = useRef<any>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const [flashlist, setFlashList] = useState<any>([])
    const [flashcards, setFlashcards] = useState<any>([])
    const axiosJWT = createAxiosInstance()
    const getFlashList = async () => {
        let result = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/flashcard-list/user`)
        setFlashList(result.data)
        setFlashcards(result.data?.flashcards)
    }
    useEffect(() => {
        const getFlashList = async () => {
            let result = await axiosJWT.get(`${process.env.NEXT_PUBLIC_BASE_URL}/flashcard-list/user`)
            setFlashList(result.data)
            setFlashcards(result.data[0]?.flashcards)
        }
        getFlashList()
    }, [])
    const [flashlistname, setFlashListName] = useState<string>("")
    const createFlashlist = async () => {
        try {
            await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/flashcard-list`, {
                name: flashlistname
            })
            toast.success("Tạo bộ từ vựng thành công")
            getFlashList()
        }
        catch (err: any) {
            toast.error("Tạo thất bại")
        }

    }

    const [word, setWord] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")
    const [listid, setListId] = useState<string>("")
    const createFlashcard = async () => {
        try {
            await axiosJWT.post(`${process.env.NEXT_PUBLIC_BASE_URL}/flashcards`, {
                word: word,
                answer: answer,
                flashcardListId: listid
            })
            toast.success("Tạo flashcard thành công")
            getFlashList()
        }
        catch (err: any) {
            toast.error("Tạo thất bại")
        }
    }
    const selectFlashlist = (idx: any) => {
        console.log(flashlist, idx)
        setFlashcards(flashlist[idx].flashcards)
    }
    return (
        <div className="px-6 py-2 bg-background shadow-md rounded-md w-full">
            <div className="flex justify-between">
                <Select onValueChange={value => selectFlashlist(value)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Chọn bộ từ vựng" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Bộ từ vựng của bạn</SelectLabel>
                            {
                                flashlist.length > 0 && flashlist.map((item: any, index: any) => {
                                    return (
                                        <SelectItem key={index} value={index}>{item.name}</SelectItem>
                                    )
                                })
                            }
                            {/* <SelectItem value="fruit">Trái cây</SelectItem>
                            <SelectItem value="bussiness">Kinh doanh</SelectItem>
                            <SelectItem value="office">Văn phòng</SelectItem>
                            <SelectItem value="animal">Động vật</SelectItem> */}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex justify-end">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="mb-2" variant="outline"><MdOutlineAddCircleOutline className="text-xl" /></Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Thêm Flashcard</SheetTitle>
                                <SheetDescription>
                                    Tạo flashcard để học tập từ vựng nhanh chóng.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <Select onValueChange={(value: any) => setListId(value)}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Chọn bộ từ vựng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Bộ từ vựng của bạn</SelectLabel>
                                        </SelectGroup>
                                        {
                                            flashlist.length > 0 && flashlist.map((item: any, index: any) => {
                                                return (
                                                    <SelectItem key={index} value={item._id}>{item.name}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="word" className="text-right">
                                        Từ vựng
                                    </Label>
                                    <Input value={word} onChange={(e) => setWord(e.target.value)} id="word" placeholder='Hello' className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="mean" className="text-right">
                                        Nghĩa
                                    </Label>
                                    <Input value={answer} onChange={(e) => setAnswer(e.target.value)} id="mean" placeholder="Xin chào" className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button onClick={createFlashcard} type="submit">Tạo flashcard</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="mb-2" variant="outline">Thêm bộ flashcards</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Thêm Bộ Flashcards</SheetTitle>
                        <SheetDescription>
                            Tạo bộ flashcard để học tập từ vựng nhanh chóng.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="flashcardlistname" className="text-left">
                                Tên bộ flashcards
                            </Label>
                            <Input onChange={(e) => setFlashListName(e.target.value)} id="flashcardlistname" placeholder='Nhập tên' className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="flashcardname" className="text-left">
                                Mô tả
                            </Label>
                            <Textarea id="flashlist description" placeholder='Nhập mô tả' className="col-span-3" />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button onClick={createFlashlist} type="submit">Tạo flashcard</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation={false}
                spaceBetween={20}
                slidesPerView={1}
                ref={sliderRef}
            >
                {
                    flashcards && flashcards.length > 0 ?
                        flashcards.map((item: any, index: any) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front h-full flex justify-center items-center bg-active">
                                                {item.word}
                                            </div>
                                            <div className="flip-card-back h-full flex justify-center items-center bg-slate-400">
                                                {item.answer}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                        : <SwiperSlide>
                            <div className="">
                                Chưa tạo flashcard, nhấn + để tạo
                            </div>
                        </SwiperSlide>
                }
            </Swiper>
            <div className="flex justify-end gap-2 mt-2">
                <Button className="" onClick={handlePrev}>
                    <FaArrowLeft />
                </Button>
                <Button className="" onClick={handleNext} >
                    <FaArrowRight />
                </Button>
            </div>
        </div >
    )
}