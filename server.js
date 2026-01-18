const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
require("dotenv").config(); // Step 2: Environment Security

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Step 3: Mongoose Schema (Data Integrity)
const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: [String],
  comments: [{ username: String, text: String }],
});

const Article = mongoose.model("Article", articleSchema);

// Database Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mernblog")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// API Routes
app.get("/api/articles/:name", async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.name });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

app.post(
  "/api/articles/:name/add-comments",
  [
    body("username").isString().trim().notEmpty().escape(),
    body("text").isString().trim().notEmpty().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, text } = req.body;
    try {
      const updatedArticle = await Article.findOneAndUpdate(
        { name: req.params.name },
        { $push: { comments: { username, text } } },
        { new: true }
      );
      res.status(200).json(updatedArticle);
    } catch (error) {
      res.status(500).json({ message: "Error updating comments", error });
    }
  }
);

app.listen(PORT, () => console.log(`Enterprise Server active on port ${PORT}`));