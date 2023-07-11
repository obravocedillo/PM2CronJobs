require("dotenv-flow").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const initializeBullMQCron = require("./services/bullMQ");
const initializeAgendaCron = require("./services/agenda");
const initializeNodeCron = require("./services/nodeCron");

const app = express();

app.use(express.json({ limit: "250mb" }));
app.use(bodyParser.json({ limit: "250mb" }));
app.use(express.urlencoded({ extended: true, limit: "250mb" }));
app.use(helmet());
app.use(cors());

/**
 *
 * @desc initialized all cron jobs
 */
const initializeConnections = async () => {
  try {
    await initializeBullMQCron();
    await initializeAgendaCron();
    await initializeNodeCron();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

initializeConnections().then(() => {
  app.get("/", (_req, res) => {
    res.status(200).send('test');
  })
});

module.exports = app;
