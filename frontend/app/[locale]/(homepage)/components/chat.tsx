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
import { Request, Room, User, roomsData, userData } from "@/app/constants/data";
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

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<User>({ _id: "", email: "", name: "", avatar: ""});
  const [friendRequests, setFriendRequests] = useState<Request[]>([{_id: "", sender: { _id: "", email: "", name: "", avatar: ""}, receiver: { _id: "", email: "", name: "", avatar: ""}, status: ""}]);

  const handleSearch = async () => {
    // Replace this with your actual search logic
    const result = await ChatService.searchFriendsByEmail(search);
    setSearchResult(result);
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
    async function getFriendRequests() {
      const requests = await ChatService.getListRequest();
      setFriendRequests(requests);
    }
    getFriendRequests();
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
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search friends by email"
              />
              <button onClick={handleSearch}>Search</button>
              {searchResult._id && (
                <div
                  className="bg-gray-100 p-2 w-full rounded-lg flex gap-x-4"
                >
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={searchResult.avatar}
                      alt={searchResult.avatar}
                      width={6}
                      height={6}
                      className="w-10 h-10 "
                    />
                  </Avatar>
                  
                  <div className="flex flex-col w-full">
                    <span>{searchResult.name}</span>
                    <button className="text-left" onClick={() => (ChatService.requestAddFriend(searchResult._id.toString()))}>Add Friend</button>
                  </div>
                </div>
              )}
              <div className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 ">
                {/* ...existing code... */}
                {friendRequests.map((request) => (
                  <div key={request._id} className="bg-gray-100 p-2 w-full rounded-lg flex gap-x-4">
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage src={request.sender.avatar} alt={request.sender.name} width={6} height={6} className="w-10 h-10 " />
                    </Avatar>
                    <div className="flex flex-col justify-center">
                      <p>{request.sender.name}</p>
                      <div className="flex gap-x-2">
                        <button onClick={() => (ChatService.acceptFriend(request._id.toString()))}>Accept</button>
                        <button onClick={() => (ChatService.denyFriend(request._id.toString()))}>Deny</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 w-full">
                {rooms.map((room, index) => (
                  <div
                    onClick={() => handleChooseFriend(room)}
                    key={index}
                    className="bg-gray-100 p-2 w-full rounded-lg cursor-pointer flex gap-x-4"
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

