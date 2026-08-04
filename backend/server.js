const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./db/db");

const {
    PORT,
    API_PREFIX
} = require("./constants/constants");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Registration Portal Backend is running"
    });
});

app.use(API_PREFIX, require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});