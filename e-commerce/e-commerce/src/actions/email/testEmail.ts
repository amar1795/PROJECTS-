import {sendEmail} from '@/lib/email';

export async function testEmail() {
  // Example usage
try {
  await sendEmail({
    to: 'jeetamar496@gmail.com',
    from: 'Register <register@purchaespal.shop>',
    subject: 'Hello from Next.js',
    message: 'Congractulations! You have successfully sent an email with purchasepal.shop!',
  });
  console.log('Email sent successfully!');
} catch (error) {
  console.error('Error sending email:', error);
  // Handle error
}
		
}