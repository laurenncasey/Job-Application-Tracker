const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const applicationRoutes = require("./routes/applications");
app.use("/applications", applicationRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));