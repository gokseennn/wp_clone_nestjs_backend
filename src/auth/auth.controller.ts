import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('send-code')
    sendCode(@Body() body: { phoneNumber: string }) {
        const isNumeric = /^\d+$/.test(body.phoneNumber);
        if (!isNumeric) {
            throw new BadRequestException('phoneNumber must be numeric.');
        }
        else {
            return this.authService.sendCode(body.phoneNumber);
        }

    }
    @Post('verify-code')
    verifyCode(@Body() body: { phoneNumber: string, code: string }) {

        return this.authService.verifyCode(body.phoneNumber, body.code);
    }
}