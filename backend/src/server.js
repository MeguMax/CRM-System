const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 CRM Backend server running on port ${PORT}`);
    console.log(`📧 Email service: ${process.env.GMAIL_USER ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`💬 Slack service: ${process.env.SLACK_BOT_TOKEN ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});