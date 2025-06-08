import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import * as nodemailer from 'nodemailer';

@Controller()
export class PhishingController {
  constructor(private dbService: DbService) {}
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'maddison53@ethereal.email',
      pass: 'jn7jnAPss4f63QBp6D',
    },
  });

  @Get('/phishingAttempts')
  async getPhishingAttempts(): Promise<any[]> {
    return this.dbService.findAll();
  }

  @Get('/updatePhishingStatus')
  async updatePhishingStatus(@Query() email: { email: string }): Promise<void> {
    console.log('Updating phishing status for email:', email);
    await this.dbService.updatePhishingStatus(email.email, 'clicked');
  }

  @Post('/phishing/send')
  async sendPhishingEmail(
    @Body() body: { email: string; link: string },
  ): Promise<void> {
    await this.sendEmail({
      email: body.email,
      link: body.link,
    });
  }

  private async sendEmail({
    email,
    link,
  }: {
    email: string;
    link: string;
  }): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: email, // list of receivers
        subject: 'Hello ✔',
        text: `${link}$$${email}`, // plain‑text body
        html: `<b>${link}$$${email}</b>`, // HTML body
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send phishing email');
    }
    await this.dbService.createPhishingAttempt(email, 'sent');
  }
}
