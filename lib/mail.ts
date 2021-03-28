import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  // @ts-ignore
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function createEmail(text: string): string {
  return `
    <div style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
        <h1>Friday Trivia</h1>
        <p>${text}</p>
        <p>👍</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const emailText = `Your password reset token is here! <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Click here to reset.</a>`;

  const info = await transporter.sendMail({
    to,
    from: process.env.MAIL_USER,
    subject: 'Your password reset token',
    html: createEmail(emailText),
  });

  // Test email
  // @ts-ignore
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`📧 Message sent: Preview it at ${getTestMessageUrl(info)}`);
  }
}
