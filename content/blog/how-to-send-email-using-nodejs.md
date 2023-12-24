---
external: false
draft: false
title: How to Send Email Using Node.js
description: How to send email using node.js step-by-step guide
date: 2023-11-19
image: '/images/nodejs-email.webp'
thumb: '/images/thumbs/10.png'
---

![React](/images/nodejs-email.webp)

Node.js has become a popular choice for backend development, thanks to its efficiency and scalability. One common task in backend development is sending emails, whether for user verification, notifications, or newsletters. In this article, we’ll explore how to send emails using Node.js, focusing on a straightforward approach that can be integrated into various applications.

### Setting Up Your Node.js Environment

Before diving into the email sending process, ensure you have Node.js installed on your system. You can download it from the [official Node.js website.](https://nodejs.org/en)

Once installed, create a new Node.js project by running `npm init` in your project directory and follow the prompts to set up your `package.json` file.

### Choosing an Email Sending Service

To send emails through Node.js, you’ll need to use an email sending service. Some popular options include:

- Nodemailer: A module for Node.js applications to allow easy email sending.
- SendGrid: Offers a Node.js library for sending emails through their platform.
- Mailgun: Another service with a Node.js library for email integration.

For this tutorial, we’ll use Nodemailer, as it’s simple to use and doesn’t require an external service account for basic functionality.

### Installing Nodemailer

Install Nodemailer in your project by running:

```bash
npm install nodemailer
```

### Sending an Email with Nodemailer

Here’s a basic example of how to send an email using Nodemailer:

1. Import Nodemailer: First, require the Nodemailer module in your script.

```js
const nodemailer = require('nodemailer');
```

2. Configure the Transporter: The transporter is essentially the email sending service. You can configure it with SMTP settings.

```js
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});
```

Note: For Gmail, you might need to enable “Less secure app access”. For a production app, it’s recommended to use OAuth2.

3. Define Email Options: Specify the sender, recipient, subject, and body of the email.

```js
let mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'Test Email from Node.js',
    text: 'This is a test email sent from a Node.js app!'
};
```

4. Send the Email: Use the sendMail method of the transporter.


```js
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
```

### Testing Your Setup

Run your Node.js script to test the email functionality. If everything is configured correctly, you should receive the test email at the specified recipient address.


### Security and Best Practices

Environment Variables: Store your email credentials in environment variables instead of hardcoding them in your script.
OAuth2: For services like Gmail, consider using OAuth2 for a more secure authentication method.
Error Handling: Implement robust error handling to manage failed email deliveries.

### Full code example

```bash
mkdir node-email-example
cd node-email-example
npm init -y
npm install nodemailer
```

```js
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-password' // Replace with your email password
    }
});

// Email options
let mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: 'recipient-email@example.com', // List of recipients
    subject: 'Node.js Email Test', // Subject line
    text: 'Hello from Node.js!', // Plain text body
    html: '<b>Hello from Node.js!</b>' // HTML body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`Message Sent: ${info.response}`);
});
```

### Important Notes:

1. Security: Hardcoding your credentials is not recommended for production applications. Use environment variables or other secure methods to store 
sensitive information.
2. Gmail Specific: If you’re using Gmail, you might need to enable “Less secure app access” in your Google account settings. However, for better security, it’s recommended to use OAuth2 authentication.
3. Error Handling: This script includes basic error handling. You may want to expand upon this for more robust applications.
4. Email Providers: If you’re using an email provider other than Gmail, you’ll need to adjust the transporter configuration with the appropriate SMTP settings for your provider.

### Conclusion

Sending emails from a Node.js application is a straightforward process, especially with modules like Nodemailer. By integrating email functionality, you can enhance the user experience and communication capabilities of your application. Remember to handle email credentials securely and test your setup thoroughly to ensure reliable email delivery.
