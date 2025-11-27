import React from 'react';
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    TrendingUp as PipelineIcon,
    Email as EmailIcon,
    Settings as SettingsIcon, // IntegrationIcon на SettingsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Clients', icon: <PeopleIcon />, path: '/clients' },
        { text: 'Pipeline', icon: <PipelineIcon />, path: '/pipeline' },
        { text: 'Email Automation', icon: <EmailIcon />, path: '/email-automation' },
        { text: 'Integration Demo', icon: <SettingsIcon />, path: '/integration-demo' }, // Додали новий пункт
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        CRM System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                selected={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Main>
                <Toolbar />
                {children}
            </Main>
        </Box>
    );
};

export default Layout;