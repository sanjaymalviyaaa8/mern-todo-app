
import { useCallback, useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Stats from "../components/Stats";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from "../services/todoService";

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);

    // Fetch todos
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getTodos();
            setTodos(response.todos || []);
        } catch (error) {
            setError("Unable to fetch tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // Create todo
    const handleCreateTodo = async (todoData) => {
        try {
            const response = await createTodo(todoData);

            setTodos((prev) => [response.todo, ...prev]);
            setShowForm(false);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create task");
        }
    };

    // Edit todo
    const handleEditTodo = async (todoData) => {
        if (!editingTodo) return;

        try {
            const response = await updateTodo(
                editingTodo._id,
                todoData
            );

            setTodos((prev) =>
                prev.map((todo) =>
                    todo._id === editingTodo._id
                        ? response.todo
                        : todo
                )
            );

            setEditingTodo(null);
            setShowForm(false);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update task");
        }
    };

    // Toggle completion
    const handleToggleTodo = async (todo) => {
        try {
            const response = await updateTodo(todo._id, {
                completed: !todo.completed,
            });

            setTodos((prev) =>
                prev.map((item) =>
                    item._id === todo._id ? response.todo : item
                )
            );
        } catch (error) {
            alert("Failed to update task");
        }
    };

    // Delete todo
    const handleDeleteTodo = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            await deleteTodo(id);

            setTodos((prev) =>
                prev.filter((todo) => todo._id !== id)
            );
        } catch (error) {
            alert("Failed to delete task");
        }
    };

    // Search and filter
    const normalizedSearch = search.trim().toLowerCase();

    const filteredTodos = todos.filter((todo) => {
        const title = (todo.title || "").toLowerCase();
        const description = (todo.description || "").toLowerCase();

        const matchesSearch =
            title.includes(normalizedSearch) ||
            description.includes(normalizedSearch);

        const matchesFilter =
            activeFilter === "All" ||
            (activeFilter === "Pending" && !todo.completed) ||
            (activeFilter === "Completed" && todo.completed);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen flex bg-slate-50">

            <Sidebar
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <main className="flex-1 min-w-0 p-4 pb-24 sm:p-8 sm:pb-24 lg:p-10">

                {/* Header */}
                <Header
                    onAddClick={() => {
                        setEditingTodo(null);
                        setShowForm(true);
                    }}
                    search={search}
                    setSearch={setSearch}
                />

                {/* Todo Form */}
                {showForm && (
                    <TodoForm
                        initialData={editingTodo}
                        onSubmit={
                            editingTodo
                                ? handleEditTodo
                                : handleCreateTodo
                        }
                        onClose={() => {
                            setShowForm(false);
                            setEditingTodo(null);
                        }}
                    />
                )}

                {/* Statistics */}
                <Stats todos={todos} />

                {/* Task Heading */}
                <div className="mb-5 mt-8">
                    <h2 className="text-xl font-bold text-slate-800">
                        {activeFilter} Tasks
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        {filteredTodos.length} tasks found
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="bg-white rounded-2xl p-8 text-center">
                        <p className="text-slate-500">
                            Loading tasks...
                        </p>
                    </div>

                ) : error ? (

                    /* Error State */
                    <div className="bg-white border border-red-100 rounded-2xl p-8 text-center">
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>

                        <button
                            onClick={fetchTodos}
                            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>

                ) : filteredTodos.length === 0 ? (

                    /* Empty State */
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center">
                        <h3 className="text-lg font-semibold text-slate-800">
                            {search
                                ? "No matching tasks"
                                : todos.length === 0
                                    ? "No tasks yet"
                                    : `No ${activeFilter.toLowerCase()} tasks`}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                            {search
                                ? "Try searching with a different keyword."
                                : "Create a new task to get started."}
                        </p>

                        {!search && todos.length === 0 && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            >
                                Create Your First Task
                            </button>
                        )}
                    </div>

                ) : (

                    /* Todo List */
                    <div className="space-y-3 sm:space-y-4">
                        {filteredTodos.map((todo) => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onToggle={handleToggleTodo}
                                onDelete={handleDeleteTodo}
                                onEdit={(todo) => {
                                    setEditingTodo(todo);
                                    setShowForm(true);
                                }}
                            />
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}

export default Dashboard;
