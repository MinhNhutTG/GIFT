const express = require('express')
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const database = require("./config/database")
require('dotenv').config()


const app = express()


database.connect();
const port = process.env.PORT || 3000



app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/gift", (req, res) => {
  res.render("gift");
}
);


app.get("/form", (req, res) => {
  res.render("form");
});

app.use("/api/upload", uploadRoutes);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})