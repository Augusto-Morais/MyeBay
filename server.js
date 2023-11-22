import express from "express";
import router from "./src/main.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", router);
app.use(express.static("src/front"));
app.set("view engine", "ejs");

app.listen(PORT,function(){
    console.log(`App running on http://localhost:${PORT}`);
});