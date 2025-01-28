const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');  // Import the cors package
require('dotenv').config();  // Ensure .env is loaded for email credentials

const app = express();
app.use(cors());  // Use CORS middleware to enable cross-origin requests
app.use(express.json());  // Middleware to parse JSON request bodies

// Create a transporter object using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address from .env
    pass: process.env.EMAIL_PASS,  // Your Gmail app password from .env
  },
});

// Route to handle sending the email
app.post('/send-email', async (req, res) => {
  const { subject, body } = req.body;

  const mailOptions = {
    from: 'chickennuggets@example.com',  // Spoof the "from" address
    to: process.env.EMAIL_USER,          // Send to your email (using .env for better security)
    subject: subject,                    // Subject from form input
    text: body,                          // Body from form input
  };

  try {
    // Send the email using Nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
