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
  from: '"Georgia Tech - Canvas<notiifications@instructure.com> " notiifications@instructure.com', // Fixed email formatting
   to: 'jjimenez84@gatech.edu,ckesa3@gatech.edu,gkaur60@gatech.edu',
  //to: 'jjimenez84@gatech.edu',
  subject: 'Upcoming Canvas Maintenance',
  html:'<p>Students/Staff,</p><p>We would like to inform you that Canvas will be undergoing scheduled maintenance on February 8th, 2025, from 10:00 PM to 4:00 AM (EST) to implement exciting new features.</p><p>During this time, there may be brief interruptions to service. We encourage you to <a href= "https://drive.google.com/file/d/1BuEMW8IrBRjGJ79STOZjGKUyFYRq_sCL/view?usp=share_link" target="_blank">review the attached document </a>for detailed overview of the cahgnes and improvements you can expect to see once the maintenance is complete.</p><p>Thank you for your understanding and cooperation.</p><p>Sincerly,</p><p>The Canvas Team</p> <br> <div style="text-align: center;"><img src="cid:logo" alt="Canvas Logo" width="150"/></div>',

//logo
  attachments: [{
	path:'/home/kali/Documents/canvasLogo.png',
	cid:'logo',
  },
  ],
};

transporter.sendMail(mailOptions, (error, info) => { // Fixed arrow function syntax
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


// read spoof doc
