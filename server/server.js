require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const app = express();
const signup = require("./routes/signup");
const items = require("./routes/items");

const port = process.env.PORT || 8080;

app.use(signup);
app.use(items);

app.listen(port, () => {
  console.log("server is running on " + port);
});
