import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './slices/clientsSlice';
import pipelineReducer from './slices/pipelineSlice';
import emailReducer from './slices/emailSlice';

// Початкові дані для тестування
const initialClients = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        company: 'ABC Corp',
        status: 'active' as const,
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        company: 'XYZ Ltd',
        status: 'active' as const,
        createdAt: new Date().toISOString(),
    }
];

const initialDeals = [
    {
        id: '1',
        title: 'Website Redesign',
        value: 5000,
        stage: 'proposal' as const,
        clientId: '1',
        expectedCloseDate: '2024-03-15',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'CRM Implementation',
        value: 10000,
        stage: 'qualification' as const,
        clientId: '2',
        expectedCloseDate: '2024-04-01',
        createdAt: new Date().toISOString(),
    }
];

const preloadedState = {
    clients: {
        clients: initialClients,
        loading: false,
        error: null,
    },
    pipeline: {
        deals: initialDeals,
        loading: false,
        error: null,
    },
    email: {
        templates: [],
        sentEmails: [],
        loading: false,
        error: null,
    }
};

export const store = configureStore({
    reducer: {
        clients: clientsReducer,
        pipeline: pipelineReducer,
        email: emailReducer,
    },
    preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;