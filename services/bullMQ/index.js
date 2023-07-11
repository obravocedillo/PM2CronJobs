const IORedis = require('ioredis');
const { Job, Queue, Worker } = require("bullmq");


// Initialize Cron Jobs using BullMQ
const startBullMQ = async () => {
    console.log('Initializing BullMQ...')

    // Initialize redis connection
    const connection = new IORedis('redis://127.0.01:6379', {
        maxRetriesPerRequest: null,
    });

    // Create queue to run cron jobs using redis connection
    const queue = new Queue("cron", {
        connection,

    });

    /**
     * Add job to queue with the data and cron syntax for the repeat pattern and specify limit to 1, this avoids
     * running this cron job more than one time
     */
    await queue.add(
        'job1',
        { cronNumber: 1 },
        {
            repeat: {
                pattern: '0 */5 * * * *',
                limit: 1,
            },
        },
    );

    // Create worker to specify the functionality the job1 needs to execute
    new Worker(
        "cron",
        async (job) => {
            console.log(`BullMQ cron job`)
        },
        {connection, autorun: true}
    );
}

module.exports = startBullMQ;