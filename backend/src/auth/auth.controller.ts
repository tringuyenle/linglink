import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LogInDTO, RefreshTokenInput } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }

    @Post('login')
    // @Version('2')
    login(@Body() body: LogInDTO) {
        return this.authService.login(body);
    }

    @Post('refreshToken')
    async refreshToken(@Body() {token}: RefreshTokenInput) {
        return this.authService.refreshToken(token);
    }
}
