import { Body, Controller, Post, BadRequestException, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('send-code')
    sendCode(@Body() body: { phoneNumber: string }, @Res() res: Response) {
        const isNumeric = /^\d+$/.test(body.phoneNumber);
        if (!isNumeric) {
            return res.status(400).json({ "status": "error", "message": "Phone number must be numeric" });
        } else {
            const expires = new Date();
            expires.setFullYear(expires.getFullYear() + 1); // 1 yıl sonrası için çerez ayarlanıyor
            res.cookie('phoneNumber', body.phoneNumber, { httpOnly: true, expires });
            const isSend = this.authService.sendCode(body.phoneNumber);
            if (isSend) {
                return res.json({ "status": "success", "message": "Code sent" });
            } else {
                return res.status(500).json({ "status": "error", "message": "Failed to send code" });
            }
        }
    }

    @Post('verify-code')
    async verifyCode(@Body() body: { code: string }, @Req() req: Request) {
        const phoneNumber = req.cookies['phoneNumber'];
        if (!phoneNumber) {
            throw new BadRequestException('Phone number not found in cookies');
        }
        console.log(body.code);
        const isVerify = await this.authService.verifyCode(phoneNumber, body.code);
        console.log(isVerify + "sdasd");
        if (isVerify) {
            return this.authService.createOrLoginUser(phoneNumber);
        } else {
            throw new BadRequestException('Verification failed');
        }
    }
    @Post('resend-code')
    reSendCode(@Res() res: Response, @Req() req: Request) {
        const phoneNumber = req.cookies['phoneNumber'];
        const expires = new Date();
        const isSend = this.authService.sendCode(phoneNumber);
        if (isSend) {
            return res.json({ "status": "success", "message": "Code sent" });
        } else {
            return res.status(500).json({ "status": "error", "message": "Failed to send code" });
        }
    }
}
