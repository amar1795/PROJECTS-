"use server"

import { sendEmail,ForgotPassword } from "@/lib/email";

export async function testEmail({last_name,first_name}) {
  // Example usage
  try {
    await sendEmail({
      to: "jeetamar496@gmail.com",
      from: "PurchasesPal Registration <register@purchaespal.shop>",
      subject: "Hello from Next.js",
      message:
        "Congractulations! You have successfully sent an email with purchasepal.shop!",
      last_name: last_name,
      first_name: first_name,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle error
  }
}

// "PurchasesPal passWord reset <Password@purchaespal.shop>"

export async function ForgotPasswordEmail({first_name,senders_email,token}:{first_name:string|null,senders_email:string,token:string}) {
  // Example usage
  try {
    await ForgotPassword({
      senders_email: senders_email,
      from_email: "PurchasesPal PasswordReset <no-reply@purchaespal.shop>",
      subject:"password reset",
      token:token,
      first_name: first_name,
      resetlink:`http://localhost:3000/password-reset?token=${token}`
      ,
    });
    // console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle error
  }
}