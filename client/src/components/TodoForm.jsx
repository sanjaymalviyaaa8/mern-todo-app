
import { useState } from "react";
import { X } from "lucide-react";

function TodoForm({ onSubmit, onClose, initialData }) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        priority: initialData?.priority || "Medium",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) return;

        onSubmit({
            ...formData,
            title: formData.title.trim(),
        });
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 mb-6">

            {/* Form Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg sm:text-xl font-bold">
                    {initialData ? "Edit Task" : "Create New Task"}
                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close form"
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Task Title */}
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Task title"
                    required
                    maxLength={120}
                    className="w-full min-w-0 border border-slate-200 rounded-xl p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition"
                />

                {/* Description */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Task description"
                    rows={3}
                    className="w-full min-w-0 border border-slate-200 rounded-xl p-3 text-sm sm:text-base outline-none resize-y focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition"
                />

                {/* Priority */}
                <div>
                    <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-slate-600 mb-2"
                    >
                        Priority
                    </label>

                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm sm:text-base bg-white outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition"
                    >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium transition-colors"
                    >
                        {initialData ? "Save Changes" : "Create Task"}
                    </button>

                </div>
            </form>
        </div>
    );
}

export default TodoForm;
