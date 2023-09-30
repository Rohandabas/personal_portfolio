const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, images, etc.) from a public directory
app.use(express.static('public'));

// Replace with your SMTP email service configuration
const transporter = nodemailer.createTransport({
  service: 'YourEmailService', // e.g., 'Gmail'
  auth: {
    user: 'your@email.com', // your email
    pass: 'your-password', // your email password
  },
});

// Define a route for the contact form submission
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Email data
  const mailOptions = {
    from: 'your@email.com', // sender email address
    to: 'recipient@email.com', // recipient email address
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error: Something went wrong. Please try again later.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent successfully!');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
