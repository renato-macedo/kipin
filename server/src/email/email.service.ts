import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { emailConstants } from '../config/constants';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: emailConstants.user,
        pass: emailConstants.password,
      },
    });
  }

  sendResetPasswordEmail(to: string | string[], link: string) {
    return this.transporter.sendMail({
      from: `"Renato Macêdo from Kipin" <${emailConstants.user}>`,
      to,
      subject: 'Please Reset Your Password',
      html: `
        <p>Kipin was requested to recovery your password.</p>
        <p>If you have not made this request, please dismiss this message.</p>
        <p>To create a new password, click the link below:</p>
        <a href="${link}">Reset Your Password</a>
        `,
    });
  }
}
