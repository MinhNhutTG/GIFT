const mongoose = require("mongoose")

module.exports.connect = async () => {
    try {
       await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Connect to database success!!");
    }
    catch {
        console.log("Connect to database error -_-");
    }
}