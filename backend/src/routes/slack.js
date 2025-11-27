const express = require('express');
const { authenticate } = require('../middleware/auth');
const slackService = require('../services/slackService');

const router = express.Router();

router.use(authenticate);

// Test Slack connection
router.get('/test', async (req, res) => {
    try {
        const result = await slackService.testConnection();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send simple message
router.post('/send-message', async (req, res) => {
    try {
        const { text, channel } = req.body;
        const result = await slackService.sendMessage(text, channel);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send client notification
router.post('/client-notification', async (req, res) => {
    try {
        const { client, action } = req.body;
        const result = await slackService.sendClientNotification(client, action);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send deal notification
router.post('/deal-notification', async (req, res) => {
    try {
        const { deal, client } = req.body;
        const result = await slackService.sendDealNotification(deal, client);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;