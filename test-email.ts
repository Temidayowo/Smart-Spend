// test-email.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function test() {
  try {
    await transporter.verify();
    console.log("✅ Connection successful");

    await transporter.sendMail({
      from: `"Spend Smart" <${process.env.GMAIL_USER}>`,
      to: "owoigbetemidayo@gmail.com", // send to yourself
      subject: "Test email",
      html: "<p>This is a test</p>",
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

test();
