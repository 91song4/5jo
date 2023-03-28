import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  constructor(
    private twilioService: TwilioService,
    private configService: ConfigService,
  ) {}

  async sendSMS(phone: string) {
    const randomNumber = Math.random().toString().split('.')[1];
    const certificationNumber = randomNumber.substring(0, 6);

    await this.twilioService.client.messages.create({
      body: certificationNumber,
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
      to: '82' + phone,
    });

    return certificationNumber;
  }
}
