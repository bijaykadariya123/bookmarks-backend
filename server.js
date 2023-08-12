///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// connection events
mongoose.connect(MONGODB_URL);

mongoose.connection
  .on("open", () => console.log("you are connected to mongoose"))
  .on("close", () => console.log("you are not connected to mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
//////////////////////////////
const bookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

///////////////////////////////
// MIDDLEWARE
//////////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

///////////////////////////////
// ROUTES
//////////////////////////////

// app.use("/", bookmarkroutes)

// // test route
// app.get("/", (req, res) => {
//   res.send("hey Aubrey");
// });

// INDEX: - GET "/"
app.get("/", async (req, res) => {
  try {
    const allBookmark = await Bookmark.find({});
    res.json(allBookmark);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// CREATE: - POST- "/"
app.post("/", async (req, res) => {
  try {
    const oneBookmark = await Bookmark.create(req.body);
    res.json(oneBookmark);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// SHOW: GET; "/:id" -
app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const oneBookmark = await Bookmark.findById(id);
    res.json(oneBookmark);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// UPDATE - PUT - "/:id" -
app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const oneBookmark = await Bookmark.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(oneBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DESTROY - DELETE - "/:id"
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const oneBookmark = await Bookmark.findByIdAndDelete(id);
    res.status(204).json(oneBookmark);
  } catch (error) {
    res.status(400).json(error);
  }
});

///////////////////////////////
// ADD LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
