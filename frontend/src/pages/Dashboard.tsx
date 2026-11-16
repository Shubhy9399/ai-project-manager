import { useState } from "react";
import {
  addTask,
  deleteTask,
  updateTaskStatus,
  type TaskStatus,
} from "../features/tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2, CheckCircle2, ListTodo, Clock3 } from "lucide-react";

const statuses: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "progress", label: "In Progress" },
  { value: "done", label: "Completed" },
];

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state: {
      tasks: {
        items: {
          id: Parameters<typeof deleteTask>[0];
          title: string;
          status: TaskStatus;
        }[];
      };
    }) => state.tasks.items,
  );

  const completed = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "progress").length;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask(title.trim()));
    setTitle("");
  }

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">Project Workspace</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Project Dashboard
        </h1>
        <p className="mt-2 text-slate-500">
          Organize and track your team's work.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Tasks", value: tasks.length, Icon: ListTodo },
          { label: "In Progress", value: inProgress, Icon: Clock3 },
          { label: "Completed", value: completed, Icon: CheckCircle2 },
        ].map(({ label, value, Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3 text-slate-500">
              <Icon size={20} />
              <span className="text-sm">{label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">Task Management</h2>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task..."
            aria-label="New task title"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-indigo-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add
          </button>
        </form>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-4"
            >
              <span className="min-w-0 flex-1 font-medium text-slate-800">
                {task.title}
              </span>

              <select
                aria-label={`Status for ${task.title}`}
                value={task.status}
                onChange={(e) =>
                  dispatch(
                    updateTaskStatus({
                      id: task.id,
                      status: e.target.value as TaskStatus,
                    }),
                  )
                }
                className="rounded-lg border border-slate-300 bg-white p-2 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => dispatch(deleteTask(task.id))}
                aria-label={`Delete ${task.title}`}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <p className="py-8 text-center text-slate-500">
              No tasks yet. Create your first task!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
