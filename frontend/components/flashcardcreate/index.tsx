"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useCallback, useRef } from 'react';
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

    return (
        <div className="px-6 py-2 bg-background shadow-md rounded-md w-full">
            <div className="flex justify-between">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn bộ từ vựng" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Bộ từ vựng của bạn</SelectLabel>
                            <SelectItem value="fruit">Trái cây</SelectItem>
                            <SelectItem value="bussiness">Kinh doanh</SelectItem>
                            <SelectItem value="office">Văn phòng</SelectItem>
                            <SelectItem value="animal">Động vật</SelectItem>
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
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="word" className="text-right">
                                        Từ vựng
                                    </Label>
                                    <Input id="word" placeholder='Hello' className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="mean" className="text-right">
                                        Nghĩa
                                    </Label>
                                    <Input id="mean" placeholder="Xin chào" className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Tạo flashcard</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation={false}
                spaceBetween={20}
                slidesPerView={1}
                ref={sliderRef}
            >
                <SwiperSlide>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front h-full flex justify-center items-center bg-active">
                                Hello
                            </div>
                            <div className="flip-card-back h-full flex justify-center items-center bg-slate-400">
                                Xin chào
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front h-full flex justify-center items-center bg-active">
                                Hello 2
                            </div>
                            <div className="flip-card-back h-full flex justify-center items-center bg-slate-400">
                                Xin chào 2
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
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