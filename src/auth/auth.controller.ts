import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        
    }

    @Post('register')
    register(@Body() body: AuthDTO) {
        return this.authService.register(body);
    }

    @Post('login')
    login() {
        return this.authService.login();
    }
}
