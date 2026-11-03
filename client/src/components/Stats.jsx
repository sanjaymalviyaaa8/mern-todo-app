import { ListTodo, Clock, CheckCircle2 } from "lucide-react";

function Stats({ todos }) {
    const total = todos.length;

    const completed = todos.filter(
        (todo) => todo.completed
    ).length;

    const pending = total - completed;

    const stats = [
        {
            title: "Total Tasks",
            value: total,
            icon: ListTodo,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            title: "Pending",
            value: pending,
            icon: Clock,
            color: "bg-orange-50 text-orange-600",
        },
        {
            title: "Completed",
            value: completed,
            icon: CheckCircle2,
            color: "bg-green-50 text-green-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="bg-white p-5 rounded-2xl border border-slate-200"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-slate-500">
                                    {stat.title}
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {stat.value}
                                </h2>
                            </div>

                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <Icon size={23} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Stats;