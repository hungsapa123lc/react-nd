import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./route/router";
import connectDb from "./config/connectDB";
var cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }))

viewEngine(app);
initWebRoute(app);
connectDb();
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server up and running"+PORT);
});