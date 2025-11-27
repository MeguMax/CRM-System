import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Clients from './pages/Clients/Clients';
import Pipeline from './pages/Pipeline/Pipeline';
import EmailAutomation from './pages/EmailAutomation/EmailAutomation';
import IntegrationDemo from './pages/IntegrationDemo/IntegrationDemo';
import { theme } from './styles/theme';

const App: React.FC = () => {
    useEffect(() => {
        // Тест для перевірки змінних оточення
        console.log('=== CRM ENVIRONMENT VARIABLES CHECK ===');
        console.log('SLACK_BOT_TOKEN exists:', !!process.env.REACT_APP_SLACK_BOT_TOKEN);
        console.log('SLACK_BOT_TOKEN length:', process.env.REACT_APP_SLACK_BOT_TOKEN?.length);
        console.log('DEMO_MODE:', process.env.REACT_APP_DEMO_MODE);
        console.log('GMAIL_USER exists:', !!process.env.REACT_APP_GMAIL_USER);
        console.log('All env variables:', process.env);

        // Тест Slack API
        if (process.env.REACT_APP_SLACK_BOT_TOKEN) {
            testSlackConnection();
        }
    }, []);

    // Функція для тестування підключення до Slack
    const testSlackConnection = async () => {
        try {
            console.log('Testing Slack connection...');

            const response = await fetch('https://slack.com/api/chat.postMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_SLACK_BOT_TOKEN}`
                },
                body: JSON.stringify({
                    channel: '#crm-test',
                    text: '🔧 CRM System connected successfully! Test message.'
                })
            });

            const data = await response.json();
            console.log('Slack API test response:', data);

            if (data.ok) {
                console.log('✅ Slack integration: SUCCESS');
            } else {
                console.error('❌ Slack integration failed:', data.error);
            }
        } catch (error) {
            console.error('❌ Slack connection error:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/pipeline" element={<Pipeline />} />
                        <Route path="/email-automation" element={<EmailAutomation />} />
                        <Route path="/integration-demo" element={<IntegrationDemo />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    );
};

export default App;