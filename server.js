const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// const path = require("path");

let productsRoute = require("./routes/productRoutes");
let userRoute = require("./routes/userRoute");
let orderRoute = require("./routes/orderRoute");

//app config
const port = process.env.PORT || 8000;
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

// db config
let mongoDBURL =
  "mongodb+srv://sandun:sandun@cluster0.xudiu.mongodb.net/mern-ecommerce";

mongoose.connect(mongoDBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

let dbconnect = mongoose.connection;
dbconnect.on("error", () => {
  console.log("Mongo db connection failed");
});

dbconnect.on("connected", () => {
  console.log("mongo db connection succesful");
});

//API routing
app.use("/api/products/", productsRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", orderRoute);

//listen
app.listen(port, () => console.log("Server Started"));
