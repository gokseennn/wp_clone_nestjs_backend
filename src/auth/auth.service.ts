import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private client: Twilio.Twilio;

    constructor(private configService: ConfigService) {
        const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
        console.log(`Account SID: ${accountSid}, Auth Token: ${authToken}`);

        this.client = Twilio(accountSid, authToken);
    }
    async sendCode(phoneNumber: string): Promise<string> {
        try {
            const verification = await this.client.verify.v2.services('VA965c113d6a05eb1e3ad5bfab62cc4cb5')
                .verifications
                .create({ to: '+' + phoneNumber, channel: 'sms' });
            console.log(verification);
            return verification.sid;
        } catch (error) {

            console.error(error);
            throw new Error('Failed to send verification code');
        }
    }
    async verifyCode(phoneNumber: string, code: string): Promise<any> {//Promise<string> {
        try {
            const verification = await this.client.verify.v2.services('VA965c113d6a05eb1e3ad5bfab62cc4cb5')
                .verificationChecks
                .create({ to: '+' + phoneNumber, code: code });
            console.log(verification);
            return verification.status;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to verify code');
        }

    }
}