import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemText,
    Button,
    Alert
} from '@mui/material';
import { notificationService } from '../../services/notificationService';
import { emailService } from '../../services/emailService';

const IntegrationDemo: React.FC = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [lastUpdate, setLastUpdate] = useState<string>('');

    const loadData = () => {
        console.log('🔄 Loading demo data...');

        const subs = notificationService.getSubscribers();
        const notifs = notificationService.getNotificationHistory();

        console.log('Subscribers from storage:', subs);
        console.log('Notifications from storage:', notifs);

        setSubscribers(subs);
        setNotifications(notifs);
        setLastUpdate(new Date().toLocaleTimeString());
    };

    useEffect(() => {
        loadData();
    }, []);

    const clearAllData = () => {
        localStorage.removeItem('crm_subscribers');
        localStorage.removeItem('crm_notifications');
        loadData();
    };

    const addTestData = () => {
        // тестові дані
        const testSubscriber = {
            id: 'test-1',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            subscribedAt: new Date().toISOString()
        };

        const testNotification = {
            id: 'test-notif-1',
            text: '🔧 Тестове сповіщення від CRM системи',
            type: 'demo',
            timestamp: new Date().toISOString()
        };

        // Зберігання тестових даних
        const currentSubs = notificationService.getSubscribers();
        const currentNotifs = notificationService.getNotificationHistory();

        localStorage.setItem('crm_subscribers', JSON.stringify([...currentSubs, testSubscriber]));
        localStorage.setItem('crm_notifications', JSON.stringify([...currentNotifs, testNotification]));

        loadData();
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Демо-інтеграції
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                Демо-режим активовано. Всі дані зберігаються локально в браузері.
            </Alert>

            {/* Кнопки управління */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Button variant="contained" onClick={loadData}>
                    Оновити дані
                </Button>
                <Button variant="outlined" onClick={addTestData}>
                    Додати тестові дані
                </Button>
                <Button variant="outlined" color="error" onClick={clearAllData}>
                    Очистити всі дані
                </Button>
                <Chip
                    label={`Оновлено: ${lastUpdate}`}
                    variant="outlined"
                    size="small"
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {/* Підписники */}
                <Card sx={{ minWidth: 300, flexGrow: 1 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            📧 Підписники розсилки
                        </Typography>
                        <Chip
                            label={`${subscribers.length} підписників`}
                            color="primary"
                            sx={{ mb: 2 }}
                        />

                        {subscribers.length === 0 ? (
                            <Typography color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                Поки що немає підписників. Створіть клієнта з опцією "Add to newsletter"
                            </Typography>
                        ) : (
                            <List dense>
                                {subscribers.map((sub) => (
                                    <ListItem key={sub.id} divider>
                                        <ListItemText
                                            primary={sub.email}
                                            secondary={
                                                <Box>
                                                    <div>{`${sub.firstName} ${sub.lastName}`}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                                                        {new Date(sub.subscribedAt).toLocaleString()}
                                                    </div>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>

                {/* Сповіщення */}
                <Card sx={{ minWidth: 300, flexGrow: 1 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            💬 Сповіщення
                        </Typography>
                        <Chip
                            label={`${notifications.length} сповіщень`}
                            color="secondary"
                            sx={{ mb: 2 }}
                        />

                        {notifications.length === 0 ? (
                            <Typography color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                Поки що немає сповіщень. Створіть клієнта або угоду
                            </Typography>
                        ) : (
                            <List dense>
                                {notifications.slice(0, 10).map((notif) => (
                                    <ListItem key={notif.id} divider>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        whiteSpace: 'pre-line',
                                                        fontFamily: 'monospace',
                                                        fontSize: '0.8rem'
                                                    }}
                                                >
                                                    {notif.text}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="caption" color="textSecondary">
                                                    {new Date(notif.timestamp).toLocaleString()}
                                                    {notif.demo && ' • ДЕМО'}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>
            </Box>

            {/* Інформація про сховище */}
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Інформація про сховище
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Дані зберігаються в localStorage браузера під ключами:
                    </Typography>
                    <Box sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        <div>• crm_subscribers - список підписників</div>
                        <div>• crm_notifications - історія сповіщень</div>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default IntegrationDemo;