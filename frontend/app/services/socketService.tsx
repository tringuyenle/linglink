import { DefaultEventsMap } from '@socket.io/component-emitter';
import { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';
import createAxiosInstance from '../utils/axiosInstance';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export async function connectSocket(email: string) {
    console.log(email);
    const axiosInstance = createAxiosInstance();
    const response: AxiosResponse<any> = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chats/create-socket-token`
    )
    socket = io("http://localhost:3000/chats", {
        auth: {
            token: response.data,
        },
        transports: ['websocket', 'polling'],
    });
}

export function getSocket() {
    return socket;
}

export function disconnectSocket() {
    socket.disconnect();
}