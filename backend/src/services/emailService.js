const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initializeTransporter();
    }

    initializeTransporter() {
        if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD
                }
            });
            console.log('✅ Gmail transporter initialized for:', process.env.GMAIL_USER);
        } else {
            console.warn('⚠️ Gmail credentials not found - email service disabled');
        }
    }

    async sendEmail({ to, subject, html, text }) {
        if (!this.transporter) {
            throw new Error('Email service not configured. Check GMAIL_USER and GMAIL_APP_PASSWORD in .env');
        }

        try {
            const mailOptions = {
                from: `CRM System <${process.env.GMAIL_USER}>`,
                to,
                subject,
                html: html || text,
                text: text || this.htmlToText(html)
            };

            console.log('📨 Attempting to send email to:', to);
            const result = await this.transporter.sendMail(mailOptions);
            console.log('✅ Email sent successfully:', result.messageId);

            return {
                success: true,
                messageId: result.messageId,
                response: result.response
            };
        } catch (error) {
            console.error('❌ Email sending failed:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }

    htmlToText(html) {
        return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }

    async sendWelcomeEmail(client) {
        const subject = `Welcome to Our CRM System, ${client.name}!`;
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">Welcome to Our CRM System!</h2>
        <p>Dear ${client.name},</p>
        <p>Thank you for joining our CRM system. We're excited to help you manage your business relationships more effectively.</p>
        <p>Here are your account details:</p>
        <ul>
          <li><strong>Name:</strong> ${client.name}</li>
          <li><strong>Email:</strong> ${client.email}</li>
          <li><strong>Company:</strong> ${client.company || 'Not specified'}</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <br>
        <p>Best regards,<br>CRM Team</p>
      </div>
    `;

        return this.sendEmail({
            to: client.email,
            subject,
            html
        });
    }

    async sendDealNotification(client, deal) {
        const subject = `New Deal: ${deal.title}`;
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">New Deal Created</h2>
        <p>Hello ${client.name},</p>
        <p>A new deal has been created in our system:</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          <h3>${deal.title}</h3>
          <p><strong>Value:</strong> $${deal.value.toLocaleString()}</p>
          <p><strong>Stage:</strong> ${deal.stage}</p>
          <p><strong>Expected Close:</strong> ${new Date(deal.expectedCloseDate).toLocaleDateString()}</p>
        </div>
        <br>
        <p>Best regards,<br>CRM Team</p>
      </div>
    `;

        return this.sendEmail({
            to: client.email,
            subject,
            html
        });
    }

    // Test connection
    async testConnection() {
        if (!this.transporter) {
            return { connected: false, error: 'Email service not configured' };
        }

        try {
            await this.transporter.verify();
            return {
                connected: true,
                user: process.env.GMAIL_USER,
                hasPassword: !!process.env.GMAIL_APP_PASSWORD
            };
        } catch (error) {
            return {
                connected: false,
                error: error.message
            };
        }
    }
}

module.exports = new EmailService();