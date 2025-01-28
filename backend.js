const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@example.com',
      pass: 'yourpassword',
    },
  });

  const mailOptions = {
    from: 'youremail@example.com',
    to: 'youremail@example.com',
    subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
