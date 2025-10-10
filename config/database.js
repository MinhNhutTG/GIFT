const mongoose = require("mongoose")

module.exports.connect = async () => {
    try {
       await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Connect to database success!!");
        console.log("Connected DB name:", mongoose.connection.name);
    }
    catch {
        console.log("Connect to database error -_-");
    }
}