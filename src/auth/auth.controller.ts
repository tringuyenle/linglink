import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LogInDTO, RefreshTokenInput } from './dto';

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

    @Post('refreshToken')
    async refreshToken(@Request() { token }: RefreshTokenInput) {
        return this.authService.refreshToken(token);
    }
}
