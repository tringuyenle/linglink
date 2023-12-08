"use client"

import React, { useEffect, useState, useRef } from "react";
import { Post } from "@/components/posts/post";
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

const TopicSelect: React.FC = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Chọn topic" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Loại bài viết</SelectLabel>
            <SelectItem value="tuvung">Từ vựng</SelectItem>
            <SelectItem value="nguphap">Ngữ pháp</SelectItem>
            <SelectItem value="luyenthi">Luyện thi</SelectItem>
            <SelectItem value="luyennghe">Luyện nghe</SelectItem>
            <SelectItem value="dochieu">Đọc hiểu</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const Filter: React.FC = () => {
  const [active, setActive] = useState<number>(0)
  const handleClick = (idx: number) => {
    if (active !== idx) {
      setActive(idx)
    }
  }
  return (
    <div className="flex gap-2">
      <Button onClick={()=>handleClick(0)} className={`${active === 0 ? "bg-black text-white" : "bg-white text-black hover:bg-slate-200"}`}>
        Phổ biến nhất
      </Button>
      <Button onClick={()=>handleClick(1)} className={`${active === 1 ? "bg-black text-white" : "bg-white text-black hover:bg-slate-200"}`}>
        Mới nhất
      </Button>
    </div>
  )
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<string[]>(["1", "2"]);
  const observerTarget = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          // Goi ham fetch data
          setIsLoading(true)
          setTimeout(function () {
            if (posts.length <= 10) {
              setPosts((prevData) => [...prevData, "1"])
            }
            setIsLoading(false)
          }, 2000);
        }
      },
      { threshold: 0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget.current]);
  return (
    <div className="infinite-scroll-container">
      <div className="flex justify-between">
        <TopicSelect />
        <Filter />
      </div>
      <ul className="w-full flex flex-col gap-4 mt-4">
        {posts.map((post, index) => {
          if (index === posts.length - 1) return (
            <div key={index}>
              <li ref={observerTarget} className="w-full flex justify-center">
                <Post data={`${post} ne`} />
              </li>
              {
                isLoading ? <div>
                  Đang tải bài viết mới
                </div> : ""
              }
            </div>
          )
          else return (
            <li key={index} className="w-full flex justify-center">
              <Post data={post} />
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Home;
