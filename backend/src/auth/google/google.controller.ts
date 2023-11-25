import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { GoogleAuthGuard } from '../guard/google.guard';

@Controller('auth/google')
export class GoogleController {
    constructor(private authService: AuthService) {}
    
    @Get('login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return { msg: 'Google Authentication' };
    }

    // api/auth/google/redirect
    @Get('callback')
    @UseGuards(GoogleAuthGuard)
    handleCallback(@Req() req, @Res({ passthrough: true }) res) {
        return this.authService.generateTokens({userId: req.user._id});
    }

}
