const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Route to handle email sending
app.post('/send-email', async (req, res) => {
  const { subject, body } = req.body;

  // Create reusable transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use email from .env
      pass: process.env.EMAIL_PASS, // Use password from .env
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email address
    to: process.env.EMAIL_USER,   // Send to the same email address
    subject,
    text: body,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error });
  }
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));
