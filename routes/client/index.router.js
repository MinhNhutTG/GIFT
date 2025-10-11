const createLetterRoutes = require("./create-letter.router");
const homeRoutes = require("./home.router");    
const giftRoutes = require("./gift.router");
module.exports = (app) => {
    app.use("/", homeRoutes);
    app.use("/create-letter", createLetterRoutes);
    app.use("/gift", giftRoutes);
}