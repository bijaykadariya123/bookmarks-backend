///////////////////////////////
// DEPENDENCIES we need to import:
require("dotenv").config()
const bookmarkroutes= require("./controller/routes")
const { PORT = 3000,MONGODB_URL  } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

mongoose.connect(MONGODB_URL)

///////////////////////////////
// ROUTES
app.use("/", bookmarkroutes)

// test route
app.get("/", (req, res) => {
  res.send("hey Aubrey");
});
////////////////////////////////





///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
