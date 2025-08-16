import type { NextApiRequest, NextApiResponse } from 'next';

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string;
  service: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const bookingData: BookingData = req.body;

    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.email || !bookingData.service) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Format the email content
    const emailContent = `
Ny bokning mottagen!

Datum: ${new Date(bookingData.date).toLocaleDateString('sv-SE')}
Tid: ${bookingData.time}
Namn: ${bookingData.name}
E-post: ${bookingData.email}
Företag: ${bookingData.company || 'Ej angivet'}
Tjänst: ${getServiceName(bookingData.service)}

Bokningen skapades: ${new Date().toLocaleString('sv-SE')}
    `;

    // Send email using a simple approach (you can replace this with your preferred email service)
    await sendEmail({
      to: 'your-email@example.com', // Replace with your actual email
      subject: 'Ny bokning - Bokario Demo',
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    });

    res.status(200).json({ message: 'Booking submitted successfully' });
  } catch (error) {
    console.error('Booking API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getServiceName(service: string): string {
  const serviceNames: { [key: string]: string } = {
    'maps': 'Google Maps-optimering',
    'bookings': 'Bokningssystem',
    'reviews': 'Recensionshantering',
    'bundle': 'Komplett paket'
  };
  return serviceNames[service] || service;
}

async function sendEmail({ to, subject, text, html }: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  // This is a placeholder for email sending
  // You can integrate with services like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with your SMTP server
  
  console.log('Email would be sent to:', to);
  console.log('Subject:', subject);
  console.log('Content:', text);
  
  // For now, we'll just log the email details
  // In production, replace this with actual email sending logic
  
  // Example with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: to,
    from: 'noreply@bokario.se',
    subject: subject,
    text: text,
    html: html,
  };
  
  await sgMail.send(msg);
  */
}
