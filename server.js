// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');  // Import CORS
require('dotenv').config();  // Load environment variables

const app = express();

// Enable CORS for all origins 
app.use(cors());

// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// Create a transporter object using Outlook's SMTP server
const transporter = nodemailer.createTransport({
  service: 'hotmail',  // Outlook uses 'hotmail' as the service
  auth: {
    user: process.env.EMAIL_USER,  // Your Outlook email (e.g., youremail@outlook.com)
    pass: process.env.EMAIL_PASS,  // Your app password from .env
  },
});

// POST route to handle sending email
app.post('/send-email', async (req, res) => {
  const { subject, body, customSender } = req.body;

  // Create email options using the dynamic values sent from the frontend
  const mailOptions = {
    from: customSender,  // Custom "From" email address
    to: process.env.EMAIL_USER,  // Your email address (or recipient address)
    subject: subject,  // Subject from frontend form
    text: body,  // Body from frontend form
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
