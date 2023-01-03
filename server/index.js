const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const projectRoute = require("./routes/projects");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/projects", projectRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
