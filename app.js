require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, {
  
}).then(() => console.log("-----<----- Connected to MongoDB ----->-----"));

const response = async (req, res) => {
    return res.status(200).send("<h1>Server is running</h1> <p>Port 3001</p>");
}




const routes = require("./routes");
app.use("/", routes, response);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});