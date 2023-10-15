import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto';
import { AuthService } from './auth.service';
import { LogInDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        
    }

    @Post('register')
    register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }

    @Post('login')
    login(@Body() body: LogInDTO) {
        return this.authService.login(body);
    }
}
