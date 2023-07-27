import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import getResults from "./backEnd/dataHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get("/", function (req, res) {
  res.render(path.join(__dirname, "../views/pages/index.ejs"));
});

router.get("/search", async function (req, res) {
  const mySearch = req.query.mySearch;
  const results = await getResults(mySearch);
  res.render(path.join(__dirname, "../views/pages/results.ejs"), {
    data: results,
  });
});



export default router;
