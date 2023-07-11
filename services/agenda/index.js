const Agenda = require("agenda");

// Initialize Cron Jobs using Node Cron
const startAgendaCron = async () => {
    console.log("Initializing Agenda...")
    const mongoConnectionString = "mongodb://127.0.0.1/agenda";

    // Initialize agenda with mongo connection string
    const agenda = new Agenda({ db: { address: mongoConnectionString } });

    /**
     * Specify the functionality the job1 needs to execute, and setting concurrency to 1, this avoids running this cron job
     * more than one time
     */
    agenda.define("job1", { concurrency: 1 }, (job) => {
        console.log('Agenda cron job')
    })

    // Start agenda
    await agenda.start();

    // Schedule job1
    await agenda.every("0 */5 * * * *", "job1");
}

module.exports = startAgendaCron;
