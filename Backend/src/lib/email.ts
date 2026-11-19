import { Resend } from "resend";
import { env } from "./env";

export async function sendEmail(email: string, username: string) {

  if (!env.RESEND_API_KEY) {
    console.log(`[email preview] Welcome ${username}, sent to ${email}`);
    return "preview"
  }
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Welcome to Exchange!",
      text: `Hi ${username},\n\nWelcome to Exchange! Your account is ready.`,
    });
    if (error) {
      console.error("Error sending email", error);
      return "error";
    }
    return "success";
  }
  catch (error:any) {
    console.error("Error sending email", error);
    return "error";
  }
}