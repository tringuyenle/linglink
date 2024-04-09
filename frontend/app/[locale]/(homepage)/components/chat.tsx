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
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Sidebar } from "@/components/chat/sidebar";
import { Room, roomsData, userData } from "@/app/constants/data";
import { ChatService } from "@/app/services";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getSocket } from "@/app/services/socketService";

export default function Chat() {
  const [openFriend, setOpenFriend] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(roomsData[0]);
  const [rooms, setRooms] = useState(roomsData);
  const handleChooseFriend = (room: Room) => {
    // Xử lý chọn user để chat ở đây
    setSelectedRoom(room);
    setOpenFriend(false);
  };
  
  useEffect(() => {
    // Lấy danh sách room chat
    async function setChatRoom() {
      const roomchats = await ChatService.getChatRoom();
      setRooms(roomchats);
      const sk = getSocket();
      roomchats.forEach((element: Room) => {
            console.log(element.chatRoomId);
            sk.emit('join-room', { chatRoomID: element.chatRoomId });
      });
    }
    setChatRoom();
  }, []);

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
            <div className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 ">
              <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 w-full">
                {rooms.map((room, index) => (
                  <div
                    onClick={() => handleChooseFriend(room)}
                    key={index}
                    className="bg-gray-100 p-2 w-full rounded-lg cursor-pointer"
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={room.friends.avatar}
                        alt={room.friends.avatar}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                    </Avatar>
                    <div className="flex flex-col w-full">
                      <span>{room.friends.name}</span>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          )}
          <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
            {!openFriend && <ChatLayout chatRoomId={selectedRoom.chatRoomId} name={selectedRoom.name} participant={selectedRoom.participant} friends={selectedRoom.friends}  />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

