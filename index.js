const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const port = 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));

app.listen(port, () => console.log(`Listening on port ${port}`));
