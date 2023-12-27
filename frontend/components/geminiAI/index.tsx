"use client"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  useState } from 'react';
import { Button } from '../ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from '../ui/input';
import { Icons } from 'react-toastify';


export default function ChatWithGemini() {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(`${process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY}`);

    const runGemini = async () => {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        
        setIsLoading(true);
        const result = await model.generateContent(question);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        setAnswer(text);
        setIsLoading(false);
        setQuestion("");
    }

    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <div className="px-6 py-2 bg-background shadow-md rounded-md w-full">
            <div className="flex justify-center	pt-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="mb-2">Chat với Gemini AI</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Gemini AI</SheetTitle>
                                <SheetDescription>
                                    Bạn hỏi Gemini trả lời.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Input value={question} onChange={(e) => setQuestion(e.target.value)} id="question" placeholder='Nhập câu hỏi của bạn' className="col-span-3" />
                                    <Button onClick={runGemini} type="submit">
                                        {isLoading ? <Icons.spinner /> : <div>gửi</div>}{" "}
                                    </Button>
                                </div> 
                            </div>
                            <div>
                                <textarea className='border w-full p-2 text-sm rounded-lg' id="" placeholder='' rows={25} value={answer}></textarea>
                            </div>
                        </SheetContent>
                    </Sheet>
            </div>
        </div >
    )
}