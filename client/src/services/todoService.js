import API from "./api";

// Get all todos
export const getTodos = async () => {
  const response = await API.get("/todos");
  return response.data;
};

// Create todo
export const createTodo = async (todoData) => {
  const response = await API.post("/todos", todoData);
  return response.data;
};

// Update todo
export const updateTodo = async (id, todoData) => {
  const response = await API.put(`/todos/${id}`, todoData);
  return response.data;
};

// Delete todo
export const deleteTodo = async (id) => {
  const response = await API.delete(`/todos/${id}`);
  return response.data;
};