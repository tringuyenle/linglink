import Image from "next/image"
import React from "react"
import banner from "@/app/assets/images/course/courses_banner.png"

const Banner: React.FC = () => {
    return (
        <div className="w-full">
            <Image className="object-cover h-full w-full" src={banner} alt="banner"/>
        </div>
    )
}

const Flashcard: React.FC = () => {
    return (
        <div className="container text-[26px] text-slate-500 font-bold text-center uppercase">
            Tính năng đang phát triển
        </div>
    )
}

export default Flashcard