
import {
    LayoutDashboard,
    CheckSquare,
    Clock,
    Settings,
    LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar({ activeFilter, setActiveFilter }) {
    const { user, logout } = useAuth();

    const menuItems = [
        { label: "All Tasks", value: "All", icon: LayoutDashboard },
        { label: "Pending", value: "Pending", icon: Clock },
        { label: "Completed", value: "Completed", icon: CheckSquare },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="w-64 min-h-screen bg-white border-r border-slate-200 p-6 hidden md:flex flex-col">
                <h2 className="text-2xl font-bold text-indigo-600 mb-10">
                    TaskFlow.
                </h2>

                <p className="text-xs font-semibold text-slate-400 uppercase mb-4">
                    Workspace
                </p>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.value}
                                onClick={() => setActiveFilter(item.value)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeFilter === item.value
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-slate-500 hover:bg-slate-50"
                                    }`}
                            >
                                <Icon size={19} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-10 text-xs text-slate-400">
                    <Settings size={16} className="inline mr-2" />
                    Settings
                </div>

                {/* User Profile */}
                <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">
                                {user?.name || "User"}
                            </p>

                            <p className="text-xs text-slate-500 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-3 py-2">
                <nav className="flex justify-around">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.value}
                                onClick={() => setActiveFilter(item.value)}
                                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium ${activeFilter === item.value
                                        ? "text-indigo-600"
                                        : "text-slate-500"
                                    }`}
                            >
                                <Icon size={21} />
                                {item.label}
                            </button>
                        );
                    })}

                    <button
                        onClick={logout}
                        className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium text-slate-500"
                    >
                        <LogOut size={21} />
                        Logout
                    </button>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;
