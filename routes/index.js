const Router = require("express");
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
  console.log(messages);
});
indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Submit your message" });
});
indexRouter.get("/messages/:id", (req, res) => {
  res.render("message", {
    title: "Message Detail",
    message: messages[req.params.id],
  });
});
indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.text,
    user: req.body.author,
    added: new Date(),
  });
  res.redirect("/");
});
module.exports = indexRouter;
