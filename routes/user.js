const express = require("express");
const routes = express.Router();
const { createUser, loginUser, deleteUser} = require("../controllers/users");
const { validateBody, setUser } = require("../middleware/users");

routes.post("/new", validateBody, createUser);

routes.post("/login", validateBody, loginUser);

routes.delete("/delete", setUser, deleteUser);

module.exports = routes;
