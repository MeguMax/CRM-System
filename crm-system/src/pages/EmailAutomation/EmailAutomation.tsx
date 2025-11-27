// pages/EmailAutomation/EmailAutomation.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Alert,
    Snackbar,
    CircularProgress
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { RootState } from '../../store/store';
// 🔄 Додаємо реальний email сервіс
import { realEmailService } from '../../services/realEmailService';

const EmailAutomation: React.FC = () => {
    const { clients } = useSelector((state: RootState) => state.clients);
    const { deals } = useSelector((state: RootState) => state.pipeline);

    const [selectedClient, setSelectedClient] = useState('');
    const [selectedDeal, setSelectedDeal] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [loading, setLoading] = useState(false);

    const handleSendEmail = async () => {
        const client = clients.find(c => c.id === selectedClient);

        if (!client) {
            setSnackbar({ open: true, message: 'Будь ласка, виберіть клієнта', severity: 'error' });
            return;
        }

        if (!emailSubject || !emailBody) {
            setSnackbar({ open: true, message: 'Будь ласка, заповніть тему та тіло листа', severity: 'error' });
            return;
        }

        setLoading(true);

        try {
            // 🔄 Використовуємо реальний сервіс для відправки email
            console.log('📨 Відправляємо email через реальний сервіс...');

            const result = await realEmailService.sendEmail(
                client.email,
                emailSubject,
                emailBody
            );

            console.log('✅ Email відправлено успішно:', result);
            setSnackbar({ open: true, message: 'Email успішно відправлено!', severity: 'success' });

            // Reset form
            setSelectedClient('');
            setSelectedDeal('');
            setEmailSubject('');
            setEmailBody('');

        } catch (error) {
            console.error('❌ Помилка відправки email:', error);
            setSnackbar({
                open: true,
                message: `Помилка відправки email: ${error instanceof Error ? error.message : 'Невідома помилка'}`,
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const emailTemplates = [
        {
            id: 1,
            name: 'Ласкаво просимо',
            subject: 'Ласкаво просимо до нашої CRM системи',
            body: 'Шановний(а) {client_name},\n\nДякуємо, що обрали нашу CRM систему! Ми раді вітати вас серед наших клієнтів.\n\nЗ повагою,\nКоманда CRM'
        },
        {
            id: 2,
            name: 'Дякуємо за звернення',
            subject: 'Дякуємо за ваше звернення',
            body: 'Шановний(а) {client_name},\n\nДякуємо за ваше звернення. Ми розглянемо ваш запит найближчим часом.\n\nЗ повагою,\nКоманда CRM'
        },
        {
            id: 3,
            name: 'Пропозиція співпраці',
            subject: 'Пропозиція співпраці - {deal_title}',
            body: 'Шановний(а) {client_name},\n\nХочемо запропонувати вам співпрацю щодо {deal_title}.\n\nДеталі пропозиції:\n- Назва: {deal_title}\n- Вартість: ${deal_value}\n\nЗ повагою,\nКоманда CRM'
        }
    ];

    const applyTemplate = (template: any) => {
        const client = clients.find(c => c.id === selectedClient);
        const deal = deals.find(d => d.id === selectedDeal);

        let subject = template.subject;
        let body = template.body;

        if (client) {
            subject = subject.replace(/{client_name}/g, client.name);
            body = body.replace(/{client_name}/g, client.name);
        }

        if (deal) {
            subject = subject.replace(/{deal_title}/g, deal.title);
            body = body.replace(/{deal_title}/g, deal.title);
            body = body.replace(/{deal_value}/g, deal.value.toString());
        }

        setEmailSubject(subject);
        setEmailBody(body);
    };

    const getSelectedClientEmail = () => {
        const client = clients.find(c => c.id === selectedClient);
        return client ? client.email : '';
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Email Автоматизація
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                📧 Emails будуть відправлені на email адреси клієнтів.
            </Alert>

            <Grid container spacing={3}>
                {/* Шаблони email */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Шаблони Email
                            </Typography>
                            {emailTemplates.map((template) => (
                                <Card
                                    key={template.id}
                                    sx={{
                                        mb: 2,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    }}
                                    onClick={() => applyTemplate(template)}
                                >
                                    <CardContent sx={{ padding: '16px !important' }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {template.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                            {template.subject}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Форма відправки email */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Написати Email
                            </Typography>

                            <TextField
                                select
                                label="Оберіть клієнта"
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                            >
                                <MenuItem value="">-- Оберіть клієнта --</MenuItem>
                                {clients.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>
                                        {client.name} ({client.email})
                                    </MenuItem>
                                ))}
                            </TextField>

                            {selectedClient && (
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    Email буде відправлено на: <strong>{getSelectedClientEmail()}</strong>
                                </Alert>
                            )}

                            <TextField
                                select
                                label="Оберіть угоду (необов'язково)"
                                value={selectedDeal}
                                onChange={(e) => setSelectedDeal(e.target.value)}
                                fullWidth
                                margin="normal"
                            >
                                <MenuItem value="">Не обрано</MenuItem>
                                {deals.map((deal) => (
                                    <MenuItem key={deal.id} value={deal.id}>
                                        {deal.title} (${deal.value})
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Тема листа"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                placeholder="Введіть тему email..."
                            />

                            <TextField
                                label="Тіло листа"
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={8}
                                required
                                placeholder="Введіть текст email..."
                                helperText="Ви можете використовувати HTML розмітку для форматування"
                            />

                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                                    onClick={handleSendEmail}
                                    disabled={!selectedClient || !emailSubject || !emailBody || loading}
                                >
                                    {loading ? 'Відправка...' : 'Надіслати Email'}
                                </Button>

                                {loading && (
                                    <Typography variant="body2" color="textSecondary">
                                        Відправляємо через Gmail...
                                    </Typography>
                                )}
                            </Box>

                            <Alert severity="warning" sx={{ mt: 2 }}>
                                ⚠️ Email буде відправлено на адресу клієнта через Gmail сервіс.
                            </Alert>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EmailAutomation;