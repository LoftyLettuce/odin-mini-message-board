const express = require("express");
const indexRouter = require("./routes");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
