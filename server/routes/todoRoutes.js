const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// Middleware for authentication
const authMiddleware = require("../middleware/authMiddleware");

// Apply authentication middleware to all routes
router.use(authMiddleware);

// POST - Create Todo
router.post("/", createTodo);

// GET - Get All Todos
router.get("/", getTodos);

// PUT - Update Todo
router.put("/:id", updateTodo);

// DELETE - Delete Todo
router.delete("/:id", deleteTodo);

module.exports = router;