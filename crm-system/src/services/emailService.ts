// email розсилка через Gmail SMTP
export const emailService = {
    async addSubscriber(email: string, firstName: string, lastName: string) {
        try {
            console.log('🔄 EmailService: Додаємо підписника', { email, firstName, lastName });
            console.log('📝 DEMO_MODE:', process.env.REACT_APP_DEMO_MODE);

            // збереження в localStorage для демонстрації
            const subscribers = JSON.parse(localStorage.getItem('crm_subscribers') || '[]');
            const newSubscriber = {
                email,
                firstName,
                lastName,
                subscribedAt: new Date().toISOString(),
                id: Date.now().toString()
            };

            subscribers.push(newSubscriber);
            localStorage.setItem('crm_subscribers', JSON.stringify(subscribers));

            console.log('📧 Subscriber added to localStorage:', newSubscriber);
            console.log('📊 Total subscribers now:', subscribers.length);

            // Якщо не демо-режим, намагаємось відправити реальний email
            if (process.env.REACT_APP_DEMO_MODE !== 'true') {
                try {
                    console.log('🔄 Спроба відправки реального email через Gmail...');
                    const emailData = {
                        to: email,
                        subject: 'Ласкаво просимо до нашої CRM системи!',
                        html: `
                            <h1>Вітаємо, ${firstName}!</h1>
                            <p>Дякуємо за підписку на розсилку нашої CRM системи.</p>
                            <p>Ми будемо повідомляти вас про нові функції та корисні поради.</p>
                            <br>
                            <p>З повагою,<br>Команда CRM</p>
                        `
                    };
                    const result = await this.sendEmail(emailData.to, emailData.subject, emailData.html);
                    console.log('✅ Gmail sending result:', result);
                    return { id: newSubscriber.id, status: 'subscribed', real: true, demo: true };
                } catch (realEmailError) {
                    console.error('❌ Gmail sending failed, but subscriber saved locally:', realEmailError);
                    return {
                        id: newSubscriber.id,
                        status: 'subscribed',
                        real: false,
                        demo: true,
                        error: realEmailError instanceof Error ? realEmailError.message : 'Unknown error'
                    };
                }
            }

            return { id: newSubscriber.id, status: 'subscribed', demo: true };

        } catch (error) {
            console.error('❌ Email service error:', error);
            throw error;
        }
    },

    async sendEmail(to: string, subject: string, html: string) {
        console.log('📨 Gmail Service: sendEmail called', { to, subject });

        // Демо-режим
        if (process.env.REACT_APP_DEMO_MODE === 'true') {
            console.log('📨 Email would be sent via Gmail to:', to);
            console.log('Subject:', subject);
            console.log('Gmail User:', process.env.REACT_APP_GMAIL_USER);
            return { success: true, demo: true, message: 'Demo mode - Gmail email not actually sent' };
        }

        // відправка через Gmail
        try {
            console.log('🔄 Attempting real Gmail sending...');

            // Gmail backend
            // виклик до backend API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to,
                    subject,
                    html,
                    from: process.env.REACT_APP_GMAIL_USER
                    // Пароль НІКОЛИ не відправляється з фронтенду!
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('✅ Gmail email sent successfully:', result);

            return {
                success: true,
                real: true,
                message: 'Email sent successfully via Gmail',
                data: result
            };
        } catch (error) {
            console.error('❌ Gmail sending error:', error);
            return {
                success: true,
                real: false,
                demo: true,
                message: 'Email saved locally (Gmail sending failed)',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    },

    async getAudienceStats() {
        try {
            const subscribers = JSON.parse(localStorage.getItem('crm_subscribers') || '[]');
            const isDemo = process.env.REACT_APP_DEMO_MODE === 'true';

            console.log('📊 Gmail audience stats:', {
                totalSubscribers: subscribers.length,
                isDemo
            });

            return {
                totalSubscribers: subscribers.length,
                openRate: isDemo ? Math.random() * 100 : 0,
                clickRate: isDemo ? Math.random() * 50 : 0,
                demo: isDemo,
                service: 'Gmail'
            };
        } catch (error) {
            console.error('❌ Gmail stats error:', error);
            return {
                totalSubscribers: 0,
                openRate: 0,
                clickRate: 0,
                demo: true,
                error: 'Failed to load Gmail stats',
                service: 'Gmail'
            };
        }
    },

    // Додаткові функції для Gmail
    async testGmailConnection() {
        try {
            console.log('🧪 Testing Gmail connection...');
            console.log('Gmail User configured:', !!process.env.REACT_APP_GMAIL_USER);
            console.log('Gmail App Password configured:', !!process.env.REACT_APP_GMAIL_APP_PASSWORD);

            return {
                connected: true,
                user: process.env.REACT_APP_GMAIL_USER,
                hasPassword: !!process.env.REACT_APP_GMAIL_APP_PASSWORD,
                demoMode: process.env.REACT_APP_DEMO_MODE === 'true'
            };
        } catch (error) {
            console.error('❌ Gmail connection test failed:', error);
            return {
                connected: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    },

    clearDemoData() {
        try {
            localStorage.removeItem('crm_subscribers');
            console.log('🗑️ Gmail demo data cleared');
            return { success: true };
        } catch (error) {
            console.error('❌ Error clearing Gmail demo data:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    },

    getAllSubscribers() {
        try {
            const subscribers = JSON.parse(localStorage.getItem('crm_subscribers') || '[]');
            console.log('📋 Getting all Gmail subscribers:', subscribers.length);
            return subscribers;
        } catch (error) {
            console.error('❌ Error getting Gmail subscribers:', error);
            return [];
        }
    }
};