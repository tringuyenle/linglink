export interface CommentProp {
    avatar: string,
    name: string,
    content: string,
    date: string,
}
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
export default function Comment({ props }: { props: CommentProp }) {
    return (
        <div className="px-6">
            <div className="flex flex-row gap-3">
                <div>
                    <Avatar>
                        <AvatarImage src={props.avatar} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="rounded-md p-2 bg-slate-50 w-full">
                    <div className="flex justify-between items-center w-full">
                        <div className="font-semibold">
                            {props.name}
                        </div>
                        <div className="text-stone-500 text-xs mb-2">
                            {props.date}
                        </div>
                    </div>
                    <div>
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    )
}