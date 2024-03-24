import { Request } from 'express';
import { User } from 'schemas/user.schema';
import { Socket } from 'socket.io';

// service types
export type CreateChatFields = {
  topic: string;
  votesPerVoter: number;
  name: string;
};

export type JoinChatFields = {
  chatID: string;
  name: string;
};

export type RejoinChatFields = {
  chatID: string;
  userID: string;
  name: string;
};

// repository types
export type CreateChatData = {
  chatID: string;
  topic: string;
  votesPerVoter: number;
  userID: string;
};

export type AddParticipantData = {
  chatID: string;
  userID: string;
  name: string;
};

// guard types
type AuthPayload = {
  chatRoomId: string;
  from_user: User;
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;