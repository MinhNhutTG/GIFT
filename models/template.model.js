const mongoose = require('mongoose');

const templateSchema  = new mongoose.Schema({
    name: String,
    previewUrl: String,
    isActive: Boolean,
})
const Template = mongoose.model("Template", templateSchema, "templates");

module.exports = Template;