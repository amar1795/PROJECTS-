"use server";

import { EmailTemplate } from '@/components/email-template'; // Adjust path as necessary
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail() {
  try {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: "facfrenzy97@gmail.com",
        subject: 'Hello world',
        react: EmailTemplate({ firstName: 'John' }),
      });
    if (error) {
      return { error, status: 500 };
    }

    return (data);
  } catch (error) {
    return { error, status: 500 };
}
}
