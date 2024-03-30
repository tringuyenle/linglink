import { IsString } from 'class-validator';

export class CreateMessageDTO {
    @IsString()
    content: string;

    imgs_url: [string];
}