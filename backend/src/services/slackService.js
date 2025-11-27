const { WebClient } = require('@slack/web-api');

class SlackService {
    constructor() {
        this.client = null;
        this.initializeClient();
    }

    initializeClient() {
        if (process.env.SLACK_BOT_TOKEN) {
            this.client = new WebClient(process.env.SLACK_BOT_TOKEN);
            console.log('✅ Slack client initialized with token:', process.env.SLACK_BOT_TOKEN.substring(0, 10) + '...');
        } else {
            console.warn('⚠️ Slack bot token not found - Slack service disabled');
        }
    }

    async sendMessage(text, channel = '#general') {
        if (!this.client) {
            throw new Error('Slack service not configured. Check SLACK_BOT_TOKEN in .env');
        }

        try {
            console.log('💬 Attempting to send Slack message to channel:', channel);
            const result = await this.client.chat.postMessage({
                channel,
                text,
                username: 'CRM System',
                icon_emoji: ':robot_face:'
            });

            console.log('✅ Slack message sent successfully to channel:', channel);
            return {
                success: true,
                ts: result.ts,
                channel: result.channel
            };
        } catch (error) {
            console.error('❌ Slack message failed:', error);

            // Більш детальна обробка помилок Slack
            if (error.data && error.data.error === 'channel_not_found') {
                throw new Error(`Slack channel '${channel}' not found. Bot must be invited to the channel.`);
            } else if (error.data && error.data.error === 'not_in_channel') {
                throw new Error(`Bot is not in channel '${channel}'. Invite the bot to the channel first.`);
            } else if (error.data && error.data.error === 'invalid_auth') {
                throw new Error('Invalid Slack bot token. Check SLACK_BOT_TOKEN in .env');
            }

            throw new Error(`Failed to send Slack message: ${error.message}`);
        }
    }

    async sendRichMessage(blocks, channel = process.env.SLACK_CHANNEL || '#general') {
        if (!this.client) {
            throw new Error('Slack service not configured');
        }

        try {
            const result = await this.client.chat.postMessage({
                channel,
                blocks,
                username: 'CRM System',
                icon_emoji: ':robot_face:'
            });

            console.log('✅ Slack rich message sent successfully');
            return {
                success: true,
                ts: result.ts,
                channel: result.channel
            };
        } catch (error) {
            console.error('❌ Slack rich message failed:', error);
            throw new Error(`Failed to send Slack rich message: ${error.message}`);
        }
    }

    async sendClientNotification(client, action = 'added') {
        const message = {
            channel: process.env.SLACK_CHANNEL || '#crm-clients',
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: `👤 Client ${action.charAt(0).toUpperCase() + action.slice(1)}`
                    }
                },
                {
                    type: 'section',
                    fields: [
                        {
                            type: 'mrkdwn',
                            text: `*Name:*\n${client.name}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Email:*\n${client.email}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Company:*\n${client.company || 'Not specified'}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Status:*\n${client.status}`
                        }
                    ]
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `🕒 ${new Date().toLocaleString()}`
                        }
                    ]
                }
            ]
        };

        return this.sendRichMessage(message.blocks, message.channel);
    }

    async sendDealNotification(deal, client) {
        const message = {
            channel: process.env.SLACK_CHANNEL || '#crm-deals',
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: '🎯 New Deal Created'
                    }
                },
                {
                    type: 'section',
                    fields: [
                        {
                            type: 'mrkdwn',
                            text: `*Deal:*\n${deal.title}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Value:*\n$${deal.value.toLocaleString()}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Client:*\n${client.name}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Stage:*\n${deal.stage}`
                        }
                    ]
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `Expected close: ${new Date(deal.expectedCloseDate).toLocaleDateString()}`
                        }
                    ]
                }
            ]
        };

        return this.sendRichMessage(message.blocks, message.channel);
    }

    // Test connection
    async testConnection() {
        if (!this.client) {
            return { connected: false, error: 'Slack service not configured' };
        }

        try {
            const result = await this.client.auth.test();
            return {
                connected: true,
                team: result.team,
                user: result.user,
                url: result.url
            };
        } catch (error) {
            return {
                connected: false,
                error: error.message
            };
        }
    }
}

module.exports = new SlackService();