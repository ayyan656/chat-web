import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1) Create a transporter using the 'gmail' service
  // This is more reliable than setting host and port manually for Gmail.
  const transporter = nodemailer.createTransport({
    service: "gmail", // <-- THE FIX IS HERE
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: `Chat Web <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

// --- No changes needed in the template below ---
const createOtpEmailTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="text-align: center; color: #333;">Verify Your Account</h2>
    <p style="font-size: 16px; color: #555;">
      Thank you for registering with Chat Web. Please use the following One-Time Password (OTP) to complete your signup process.
    </p>
    <div style="text-align: center; margin: 30px 0; background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000; margin: 0;">${otp}</p>
    </div>
    <p style="font-size: 16px; color: #555;">
      This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
    </p>
    <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 30px;">
      &copy; 2024 Chat Web. All rights reserved.
    </p>
  </div>
`;

export { sendEmail, createOtpEmailTemplate };
