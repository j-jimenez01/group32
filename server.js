const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Fixed: Comma instead of period
  },
});

const mailOptions = {
  from: '"notifications@infrastructure.com" <testing@123.com>', // Fixed email formatting
  to: 'c3cs491a@gmail.com',
  subject: 'Test email from Node.js',
  text: 'This is a test email sent from Node.js using Nodemailer!',
  attachments: [{
    filename:'image.pdf',
    path: '/path/to/file'
  }]
};

transporter.sendMail(mailOptions, (error, info) => { // Fixed arrow function syntax
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
