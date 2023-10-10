import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
    register() {
        return {
            message: 'hello new user',
        }
    }

    login() {
        return {
            message: 'hello login already',
        }
    }
}
