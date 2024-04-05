"use client";
import { ChatLayout } from "@/components/chat/chat-layout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import chat from "@/app/assets/images/chat.png";
import Image from "next/image";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Sidebar } from "@/components/chat/sidebar";
import { userData } from "@/app/constants/data";

export default function Chat() {
  const [openFriend, setOpenFriend] = useState(false);
  const handleChooseFriend = () => {
    // Xử lý chọn user để chat ở đây
    setOpenFriend(false);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-4 rounded-full w-14 h-14"
          variant="outline"
        >
          <Image
            className="h-8 w-8 drop-shadow-lg object-contain"
            src={chat}
            alt="chat"
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>
        <div className="gap-4 py-4 scroll-auto max-h-[500px]">
          {!openFriend && (
            <IoMdArrowRoundBack
              className="text-xl mb-6 cursor-pointer"
              onClick={() => setOpenFriend(true)}
            />
          )}
          {openFriend && (
            <Sidebar
              links={userData.map((user) => ({
                name: user.name,
                messages: user.messages ?? [],
                avatar: user.avatar,
                variant: "grey",
              }))}
              onClick={handleChooseFriend}
            />
          )}
          <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
            {!openFriend && <ChatLayout />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
