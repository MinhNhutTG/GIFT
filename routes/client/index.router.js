const createLetterRoutes = require("./create-letter.router");
const homeRoutes = require("./home.router");    
module.exports = (app) => {
    app.use("/", homeRoutes);
    app.use("/create-letter", createLetterRoutes);
}