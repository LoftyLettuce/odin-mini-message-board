import express from "./express.js";
const app = express();
app.get("/", (req, res) => res.end("Hello word!"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
