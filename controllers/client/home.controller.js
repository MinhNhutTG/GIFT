// [GET] /admin/dashboard
const Template = require("../../models/template.model");

module.exports.index = async (req, res) => {
    let find = { isActive: true };
    const templates = await Template.find(find);
    console.log(templates);
    res.render("./client/pages/home.pug",
    {
        templates: templates
    }
    );
}