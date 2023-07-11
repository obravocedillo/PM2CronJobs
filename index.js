const port = process.env.PORT || 3015;
const app = require("./app");

/**
 * Listen on port 3015
 */
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
