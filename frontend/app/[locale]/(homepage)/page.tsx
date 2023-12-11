"use client"

import React, { useEffect, useState, useCallback } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import CreatePost from "./components/createpost";

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
      <Button onClick={() => handleClick(0)} className={`${active === 0 ? "bg-black text-white" : "bg-white text-black hover:bg-slate-200"}`}>
        Phổ biến nhất
      </Button>
      <Button onClick={() => handleClick(1)} className={`${active === 1 ? "bg-black text-white" : "bg-white text-black hover:bg-slate-200"}`}>
        Mới nhất
      </Button>
    </div>
  )
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [end, setEnd] = useState<boolean>(false)
  const createpost = (post: any) => {
    setPosts((prev) => [post, ...prev])
  }
  async function getPostByLastID() {
    try {
      if (!end) {
        setIsLoading(true);
        let lastId = "";
        if (posts.length > 0) lastId = posts[posts.length - 1]._id;
        const newData = await axios.get((`${process.env.NEXT_PUBLIC_BASE_URL}/posts/page`), {
          params: {
            lastPostId: lastId,
            pageSize: 5
          }
        });
        if (newData.data.length === 0) {
          toast.warning("Bạn đã đến posts cuối cùng")
          setEnd(true)
        }
        if (posts.length > 20 && newData.data.length > 0) {
          setPosts(() => {
            const updatedPosts = [...newData.data];
            return updatedPosts;
          });
        }
        else setPosts((prevData) => {
          const updatedPosts = [...prevData, ...newData.data];
          return updatedPosts;
        });
        setIsLoading(false);
      }
    }
    catch (err) {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getPostByLastID()
  }, []);

  const elRef = useCallback((node: any) => {
    if (node !== null) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Gọi hàm fetch data
            getPostByLastID();
          }
        },
        { threshold: 0 }
      );

      if (node) {
        observer.observe(node);
      }

      return () => {
        if (node) {
          observer.unobserve(node);
        }
      };
    }
  }, [posts]);
  return (
    <div className="infinite-scroll-container w-full">
      <CreatePost add={createpost} />
      <div className="flex justify-between my-4">
        <TopicSelect />
        <Filter />
      </div>
      <ul className="w-full flex flex-col gap-4 mt-4">
        {posts.map((post, index) => {
          if (index === posts.length - 1) return (
            <div key={index}>
              <li ref={elRef} className="w-full flex justify-center">
                <Post data={post} />
              </li>
              {
                isLoading ? <div className="w-full my-4 justify-center flex shadow-md bg-background py-2">
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
