
import { Search, Plus } from "lucide-react";

function Header({ onAddClick, search, setSearch }) {
    return (
        <header className="flex flex-col gap-5 mb-8 sm:flex-row sm:items-center sm:justify-between">

            {/* Page Title */}
            <div>
                <p className="text-sm text-slate-400">
                    Workspace / Tasks
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                    My Tasks
                </h1>

                <p className="text-slate-500 mt-1 text-sm sm:text-base">
                    Manage your daily activities.
                </p>
            </div>

            {/* Search and Add Button */}
            <div className="flex flex-col xs:flex-row sm:flex-row gap-3 w-full sm:w-auto">

                {/* Search */}
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 w-full sm:w-52">
                    <Search
                        size={18}
                        className="text-slate-400 shrink-0"
                    />

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full min-w-0 py-3 outline-none text-sm"
                    />
                </div>

                {/* Add Task */}
                <button
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto whitespace-nowrap"
                >
                    <Plus size={18} />
                    Add Task
                </button>

            </div>
        </header>
    );
}

export default Header;
