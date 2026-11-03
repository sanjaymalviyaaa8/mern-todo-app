
import {
    CheckCircle2,
    Circle,
    Trash2,
    Pencil,
} from "lucide-react";

function TodoCard({ todo, onToggle, onDelete, onEdit }) {
    const priorityColors = {
        Low: "bg-green-50 text-green-600",
        Medium: "bg-orange-50 text-orange-600",
        High: "bg-red-50 text-red-600",
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4">

            {/* Complete Button */}
            <button
                type="button"
                onClick={() => onToggle(todo)}
                aria-label={todo.completed ? "Mark as pending" : "Mark as completed"}
                className="mt-1 text-indigo-600 shrink-0 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
            >
                {todo.completed ? (
                    <CheckCircle2 size={22} />
                ) : (
                    <Circle size={22} />
                )}
            </button>

            {/* Task Details */}
            <div className="flex-1 min-w-0">

                <h3
                    className={`font-semibold text-sm sm:text-base break-words ${
                        todo.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800"
                    }`}
                >
                    {todo.title}
                </h3>

                {todo.description && (
                    <p className="text-sm text-slate-500 mt-1 whitespace-pre-wrap break-words">
                        {todo.description}
                    </p>
                )}

                {/* Priority and Status */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">

                    <span
                        className={`text-xs px-3 py-1 rounded-full ${
                            priorityColors[todo.priority] || "bg-slate-100 text-slate-600"
                        }`}
                    >
                        {todo.priority}
                    </span>

                    <span className="text-xs text-slate-400">
                        {todo.completed ? "Completed" : "Pending"}
                    </span>

                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">

                <button
                    type="button"
                    onClick={() => onEdit(todo)}
                    aria-label="Edit task"
                    title="Edit task"
                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                    <Pencil size={18} />
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(todo._id)}
                    aria-label="Delete task"
                    title="Delete task"
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                    <Trash2 size={18} />
                </button>

            </div>
        </div>
    );
}

export default TodoCard;
