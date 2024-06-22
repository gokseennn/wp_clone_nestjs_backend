import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/auth/model/user_model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    private client: Twilio.Twilio;
    private requestID: string | null = null; // request_id'yi saklamak için bir sınıf değişkeni

    @InjectRepository(User)
    private userRepository: Repository<User>;

    constructor(private configService: ConfigService) {
        this.client = Twilio(this.configService.get('TWILIO_ACCOUNT_SID'), this.configService.get('TWILIO_AUTH_TOKEN'));
    }

    async sendCode(phoneNumber: string): Promise<any> {
        try {

            const verification = this.client.verify.v2.services('VAfd0f7d02ff52728d473048e6090a3f42')
                .verifications
                .create({ to: '+' + phoneNumber, channel: 'sms' });
            console.log(verification);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async verifyCode(phoneNumber: string, code: string): Promise<boolean> {

        try {

            const verification = await this.client.verify.v2.services('VAfd0f7d02ff52728d473048e6090a3f42')
                .verificationChecks
                .create({ to: '+' + phoneNumber, code: code });
            if (await verification.status == "approved") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async createOrLoginUser(phoneNumber: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { phoneNumber } });
        if (existingUser) {
            return existingUser;
        } else {
            const newUser = this.userRepository.create({ phoneNumber });
            return this.userRepository.save(newUser);
        }
    }
}