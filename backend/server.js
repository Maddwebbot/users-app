const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let id = 1;

// Root
app.get("/", (req, res) => {
  res.send("CRUD API Running 🚀");
});

// CREATE
app.post("/users", (req, res) => {
  const newUser = { id: id++, name: req.body.name };
  users.push(newUser);
  res.json(newUser);
});

// READ
app.get("/users", (req, res) => {
  res.json(users);
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  res.json(user);
});

// DELETE
app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.send("Deleted");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
