const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const getConnection = require("./config/db");
const app = express();
const routes = require("./routes");

//registering middlewares
dotEnv.config();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

//connecting TO DB
getConnection();

//listening to port
const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
