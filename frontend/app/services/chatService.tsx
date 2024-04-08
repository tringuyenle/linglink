import { AxiosResponse } from "axios";
import createAxiosInstance from "../utils/axiosInstance";

// interface FlashcardProps {
//     word: string;
//     answer: any;
//     listid: string;
// }

export class ChatService {
    static async getChatRoom() {
        const axiosInstance = createAxiosInstance();
        let result = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/chats`);
        return result.data;
    }
    // static async create({ word, answer, listid }: FlashcardProps) {
    //     const axiosInstance = createAxiosInstance();
    //     await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/flashcards`, {
    //     word: word,
    //     answer: answer,
    //     flashcardListId: listid,
    //     });
    // }
}
