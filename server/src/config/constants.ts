export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const HOST = process.env.HOST || 'http://localhost:3000';

export const emailConstants = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
};
