// Email utility for sending verification and reset emails
// In production, use a service like SendGrid, Mailgun, or AWS SES

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
  
  // For development, just log the URL
  console.log('\n=================================');
  console.log('📧 EMAIL VERIFICATION');
  console.log('=================================');
  console.log(`To: ${email}`);
  console.log(`Verification URL: ${verificationUrl}`);
  console.log('=================================\n');
  
  // In production, replace with actual email service:
  /*
  const msg = {
    to: email,
    from: 'noreply@investly.com',
    subject: 'Verify Your Email - Investly',
    html: `
      <h2>Welcome to Investly!</h2>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `
  };
  await emailService.send(msg);
  */
  
  return true;
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  
  // For development, just log the URL
  console.log('\n=================================');
  console.log('🔐 PASSWORD RESET');
  console.log('=================================');
  console.log(`To: ${email}`);
  console.log(`Reset URL: ${resetUrl}`);
  console.log('=================================\n');
  
  // In production, replace with actual email service:
  /*
  const msg = {
    to: email,
    from: 'noreply@investly.com',
    subject: 'Reset Your Password - Investly',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };
  await emailService.send(msg);
  */
  
  return true;
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const contactEmail = 'investly.official@gmail.com';
  
  // For development, log the contact message
  console.log('\n=================================');
  console.log('📧 CONTACT FORM MESSAGE');
  console.log('=================================');
  console.log(`To: ${contactEmail}`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('=================================\n');
  
  // In production, replace with actual email service:
  /*
  const msg = {
    to: contactEmail,
    from: 'noreply@investly.com',
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <hr>
      <p><em>This message was sent through the Investly contact form.</em></p>
    `
  };
  await emailService.send(msg);
  */
  
  return true;
};
