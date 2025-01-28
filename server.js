const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();  // To load credentials securely

const app = express();
app.use(express.json());  // Middleware to parse JSON request bodies

// Create a transporter object using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Use Gmail SMTP
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address (e.g., youremail@gmail.com)
    pass: process.env.EMAIL_PASS,  // Your Gmail password or app password
  },
});

// Route to handle sending the email
app.post('/send-email', (req, res) => {
  const { subject, body } = req.body;

  const mailOptions = {
    from: 'chickennuggets@example.com',  // Spoof the "from" address
    to: 'your-email@example.com',        // Your real email or any recipient
    subject: subject,                    // Subject from form input
    text: body,                          // Body from form input
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
