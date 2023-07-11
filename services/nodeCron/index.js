const cron = require('node-cron');

// Initialize Cron Jobs using Node Cron
const startNodeCron = () => {
    console.log('Initializing node cron...')

    // pm2 instance name
    const processName = process.env.name || 'primary';

    // Only schedule cron job if it´s the primary pm2 instance
    if(processName === 'primary'){
        // schedule cron job
        cron.schedule('0 */5 * * * *', () => {
            console.log('node-cron cron job');
        });
    }
}

module.exports = startNodeCron;