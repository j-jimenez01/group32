const nodemailer = require('nodemailer');
require('dotenv').config();  // Ensure you load email credentials securely

// Create a transporter object using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address (e.g., youremail@gmail.com)
    pass: process.env.EMAIL_PASS,  // Your Gmail password or app password
  },
});

// Email options
const mailOptions = {
  from: 'chickennuggets@example.com',  // Spoof the "from" address
  to: 'your-email@example.com',        // Your real email or any recipient
  subject: 'Test Email from Chickennuggets',
  text: 'This is a test email sent from the spoofed address chickennuggets@example.com!',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
