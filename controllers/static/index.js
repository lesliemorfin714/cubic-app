const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://cluster0.vtfhi.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "cubeCollection",
      user: "lesliem",
      pass: "GitHub!",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("Holy crap: it works!"))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("You got it!");
});

app.listen(config.port, console.log(`Listening on port ${config.port}!`));
