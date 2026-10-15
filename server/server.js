const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Resend } = require('resend');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Official Resend Environment Variables
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@studiogta.ca';
const BOOKING_EMAIL = process.env.BOOKING_EMAIL || 'tour@studiogta.ca';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Studio GTA <verified-sender@studiogta.ca>';

// Initialize Resend SDK if valid key provided
const isResendConfigured = Boolean(
  RESEND_API_KEY &&
  RESEND_API_KEY.trim() !== '' &&
  RESEND_API_KEY !== 're_your_api_key' &&
  !RESEND_API_KEY.includes('your_api_key')
);

let resendClient = null;
if (isResendConfigured) {
  resendClient = new Resend(RESEND_API_KEY);
  console.log('[RESEND SERVICE] Official Resend SDK initialized.');
} else {
  console.log('[RESEND SERVICE] Local preview mode active (Inquiries logged to server console).');
}

// CORS setup
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Security & Validation Helpers
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

function sanitizeHeader(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\r\n\t]/g, ' ').trim();
}

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email.trim());
}

// In-Memory Rate Limiting (max 5 submissions per 15 minutes per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// Clean up stale rate limit entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 10 * 60 * 1000);

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      error: 'Too many submissions from this connection. Please wait a few minutes before trying again or call 647-300-0315.'
    });
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  next();
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Studio GTA Real Estate Media API',
    contactEmail: CONTACT_EMAIL,
    bookingEmail: BOOKING_EMAIL,
    resendConfigured: isResendConfigured,
    mode: isResendConfigured ? 'live-resend' : 'local-preview'
  });
});

// 1. Contact Form Endpoint with Resend Integration
app.post('/api/contact', rateLimiter, async (req, res) => {
  try {
    const { name, email, phone, service, location, message, preferredDate, honeypot } = req.body;

    // Spam honeypot detection
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    // Input sanitization
    const cleanName = sanitizeHeader(name);
    const cleanEmail = sanitizeHeader(email);
    const cleanPhone = sanitizeHeader(phone);
    const cleanService = sanitizeHeader(service);
    const cleanLocation = sanitizeHeader(location);
    const cleanDate = sanitizeHeader(preferredDate);
    const cleanMessage = sanitize(message);

    // Validation
    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name (at least 2 characters).' });
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    if (!cleanMessage && !cleanService) {
      return res.status(400).json({ success: false, error: 'Please include details about your inquiry.' });
    }

    const emailSubject = `New Inquiry: ${cleanService || 'General Consultation'} — ${cleanName}`;
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; border: 1px solid #e7e5e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #141211; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">STUDIO GTA REAL ESTATE MEDIA</h2>
          <p style="margin: 6px 0 0 0; color: #c5a880; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Website Contact Form Inquiry</p>
        </div>
        <div style="padding: 24px; background-color: #fafaf9;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #57534e;">Full Name:</td><td style="padding: 8px 0; color: #1c1917;">${cleanName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #967548;">${cleanEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Phone:</td><td style="padding: 8px 0; color: #1c1917;">${cleanPhone ? `<a href="tel:${cleanPhone}" style="color: #1c1917;">${cleanPhone}</a>` : 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Service / Interest:</td><td style="padding: 8px 0; color: #1c1917;">${cleanService || 'General Consultation'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Property Location:</td><td style="padding: 8px 0; color: #1c1917;">${cleanLocation || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Preferred Date:</td><td style="padding: 8px 0; color: #1c1917;">${cleanDate || 'Flexible'}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #ffffff; border-left: 4px solid #c5a880; border-radius: 4px; border: 1px solid #e7e5e0; border-left-width: 4px;">
            <p style="margin: 0 0 6px 0; font-weight: bold; color: #57534e; font-size: 13px;">Message Details:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #1c1917;">${cleanMessage || 'No message text provided.'}</p>
          </div>
        </div>
        <div style="padding: 16px; background-color: #f5f5f4; text-align: center; font-size: 12px; color: #78716c;">
          Delivered via Resend to Studio GTA (${CONTACT_EMAIL}). Reply directly to this email to reach ${cleanName}.
        </div>
      </div>
    `;

    const textContent = `New Contact Submission from ${cleanName} (${cleanEmail}, ${cleanPhone || 'No phone'}):\nService: ${cleanService}\nLocation: ${cleanLocation}\nPreferred Date: ${cleanDate}\nMessage:\n${cleanMessage}`;

    if (resendClient) {
      const { data, error } = await resendClient.emails.send({
        from: EMAIL_FROM,
        to: [CONTACT_EMAIL],
        reply_to: cleanEmail,
        subject: emailSubject,
        html: emailHtml,
        text: textContent
      });

      if (error) {
        console.error('[RESEND DISPATCH ERROR]', error.message || error);
        return res.status(500).json({
          success: false,
          error: 'An issue occurred while transmitting your message. Please contact us directly at 647-300-0315 or info@studiogta.ca.'
        });
      }

      console.log(`[RESEND SUCCESS] Contact inquiry from ${cleanName} dispatched to ${CONTACT_EMAIL} (ID: ${data?.id})`);
    } else {
      console.log('\n=================== [LOCAL PREVIEW] NEW CONTACT INQUIRY ===================');
      console.log(`To: ${CONTACT_EMAIL}`);
      console.log(`Reply-To: ${cleanEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Name: ${cleanName} | Phone: ${cleanPhone || 'N/A'}`);
      console.log(`Service: ${cleanService} | Location: ${cleanLocation || 'N/A'}`);
      console.log(`Message: ${cleanMessage}`);
      console.log('===========================================================================\n');
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent to Studio GTA. We will respond within 24 hours.'
    });
  } catch (err) {
    console.error('[CONTACT ROUTE ERROR]', err.message || err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while sending your message. Please call 647-300-0315 or email info@studiogta.ca.'
    });
  }
});

// 2. Booking Endpoint with Resend Integration (supports /api/book-package, /api/booking, /api/book)
app.post(['/api/book-package', '/api/booking', '/api/book'], rateLimiter, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      package: selectedPackage,
      propertyAddress,
      preferredDate,
      preferredTime,
      propertySize,
      notes,
      honeypot
    } = req.body;

    // Spam honeypot detection
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Booking request received' });
    }

    // Input sanitization
    const cleanName = sanitizeHeader(name);
    const cleanEmail = sanitizeHeader(email);
    const cleanPhone = sanitizeHeader(phone);
    const cleanPackage = sanitizeHeader(selectedPackage);
    const cleanAddress = sanitizeHeader(propertyAddress);
    const cleanDate = sanitizeHeader(preferredDate);
    const cleanTime = sanitizeHeader(preferredTime);
    const cleanSize = sanitizeHeader(propertySize);
    const cleanNotes = sanitize(notes);

    // Validation
    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your full name.' });
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!cleanPhone || cleanPhone.length < 7) {
      return res.status(400).json({ success: false, error: 'Please provide a valid contact phone number.' });
    }

    if (!cleanPackage) {
      return res.status(400).json({ success: false, error: 'Please select a package.' });
    }

    if (!cleanAddress) {
      return res.status(400).json({ success: false, error: 'Please provide the property address or city.' });
    }

    const emailSubject = `Package Booking Request: ${cleanPackage} — ${cleanName}`;
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; border: 1px solid #e7e5e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #141211; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">STUDIO GTA REAL ESTATE MEDIA</h2>
          <p style="margin: 6px 0 0 0; color: #c5a880; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">New Shoot Booking Request</p>
        </div>
        <div style="padding: 24px; background-color: #fafaf9;">
          <div style="background-color: #ffffff; border-left: 4px solid #967548; padding: 14px 18px; margin-bottom: 20px; border-radius: 4px; border: 1px solid #e7e5e0; border-left-width: 4px;">
            <p style="margin: 0; font-size: 15px; font-weight: 600; color: #141211;">Selected Package: <span style="color: #967548;">${cleanPackage}</span></p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 150px; color: #57534e;">Client Name:</td><td style="padding: 8px 0; color: #1c1917;">${cleanName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${cleanEmail}" style="color: #967548;">${cleanEmail}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Phone:</td><td style="padding: 8px 0; color: #1c1917;"><a href="tel:${cleanPhone}" style="color: #1c1917;">${cleanPhone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Property Address:</td><td style="padding: 8px 0; color: #1c1917; font-weight: 600;">${cleanAddress}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Preferred Date:</td><td style="padding: 8px 0; color: #1c1917;">${cleanDate || 'Flexible / Next Available'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Preferred Time:</td><td style="padding: 8px 0; color: #1c1917;">${cleanTime || 'Morning / Afternoon'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #57534e;">Property Size:</td><td style="padding: 8px 0; color: #1c1917;">${cleanSize || 'Not specified (Standard < 3,000 sq ft)'}</td></tr>
          </table>
          ${cleanNotes ? `
          <div style="margin-top: 20px; padding: 16px; background: #ffffff; border-left: 4px solid #c5a880; border-radius: 4px; border: 1px solid #e7e5e0; border-left-width: 4px;">
            <p style="margin: 0 0 6px 0; font-weight: bold; color: #57534e; font-size: 13px;">Additional Notes / Access / Lockbox:</p>
            <p style="margin: 0; white-space: pre-wrap; color: #1c1917;">${cleanNotes}</p>
          </div>
          ` : ''}
        </div>
        <div style="padding: 16px; background-color: #f5f5f4; text-align: center; font-size: 12px; color: #78716c;">
          Delivered via Resend to Studio GTA (${BOOKING_EMAIL}). Reply directly or call ${cleanPhone} to confirm the appointment.
        </div>
      </div>
    `;

    const textContent = `New Booking Request for ${cleanPackage} from ${cleanName} (${cleanEmail}, ${cleanPhone}):\nAddress: ${cleanAddress}\nDate: ${cleanDate || 'Flexible'}\nTime: ${cleanTime || 'Flexible'}\nSize: ${cleanSize || 'Standard'}\nNotes:\n${cleanNotes}`;

    if (resendClient) {
      const { data, error } = await resendClient.emails.send({
        from: EMAIL_FROM,
        to: [BOOKING_EMAIL],
        reply_to: cleanEmail,
        subject: emailSubject,
        html: emailHtml,
        text: textContent
      });

      if (error) {
        console.error('[RESEND DISPATCH ERROR]', error.message || error);
        return res.status(500).json({
          success: false,
          error: 'An issue occurred while processing your booking request. Please contact 647-300-0315 or tour@studiogta.ca.'
        });
      }

      console.log(`[RESEND SUCCESS] Booking request for ${cleanPackage} dispatched to ${BOOKING_EMAIL} (ID: ${data?.id})`);
    } else {
      console.log('\n=================== [LOCAL PREVIEW] NEW PACKAGE BOOKING REQUEST ===================');
      console.log(`To: ${BOOKING_EMAIL}`);
      console.log(`Reply-To: ${cleanEmail}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Package: ${cleanPackage}`);
      console.log(`Client: ${cleanName} | Phone: ${cleanPhone}`);
      console.log(`Address: ${cleanAddress}`);
      console.log(`Date & Time: ${cleanDate || 'Flexible'} at ${cleanTime || 'Flexible'}`);
      console.log(`Size: ${cleanSize || 'Standard'}`);
      console.log(`Notes: ${cleanNotes || 'None'}`);
      console.log('===================================================================================\n');
    }

    return res.status(200).json({
      success: true,
      message: `Your booking request for the "${cleanPackage}" has been received! Our team will contact you shortly to confirm the appointment and provide shoot preparation details.`
    });
  } catch (err) {
    console.error('[BOOKING ROUTE ERROR]', err.message || err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your booking request. Please call 647-300-0315 or email tour@studiogta.ca.'
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`Studio GTA Backend Server successfully running on port ${PORT}`);
  console.log(`Local API URL: http://localhost:${PORT}`);
  console.log(`Accepting inquiries from frontend: ${CLIENT_URL}`);
  console.log(`Contact inquiries routed to: ${CONTACT_EMAIL}`);
  console.log(`Booking inquiries routed to: ${BOOKING_EMAIL}`);
  if (isResendConfigured) {
    console.log(`Email Service: PRODUCTION MODE (Resend Node.js SDK Active)`);
    console.log(`Verified sender: ${EMAIL_FROM}`);
  } else {
    console.log(`Email Service: LOCAL PREVIEW MODE (Submissions logged to server console)`);
    console.log(`To enable live Resend email dispatch, configure RESEND_API_KEY in server/.env`);
  }
  console.log(`======================================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[PORT CONFLICT ERROR] Port ${PORT} is already in use by another process.`);
    console.error(`An earlier instance of the Studio GTA backend may already be running.`);
    console.error(`To inspect the conflicting process in Windows PowerShell:`);
    console.error(`   netstat -ano | findstr :${PORT}`);
    console.error(`\nTo specify a different port, set PORT in server/.env or terminate the earlier instance.`);
    process.exit(1);
  } else {
    console.error('\n[SERVER ERROR]', err);
    process.exit(1);
  }
});
