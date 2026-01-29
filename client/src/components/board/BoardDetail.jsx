import React, { useEffect, useState } from "react";
import useBoardStore from "../../store/useBoardStore";
import {
  Plus,
  CheckCircle,
  Circle,
  Clock,
  Trash2,
  ArrowLeft,
} from "lucide-react";

const BoardDetail = ({ boardId }) => {
  const {
    boards,
    currentTodos,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useBoardStore();

  const board = boards.find((b) => b._id === boardId);

  const [title, setTitle] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchTodos(boardId);
  }, [boardId, fetchTodos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(boardId, title.trim());
    setTitle("");
    setShowAdd(false);
  };

  if (!board) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  const categories = [
    { name: "Pending", color: "#94a3b8", icon: <Circle size={18} /> },
    { name: "In Progress", color: "#6366f1", icon: <Clock size={18} /> },
    { name: "Completed", color: "#22c55e", icon: <CheckCircle size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => (window.location.hash = "#dashboard")}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium
        text-slate-400 hover:text-slate-200 transition"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-50">
          {board.name}
        </h1>
        {board.description && (
          <p className="mt-3 max-w-2xl text-slate-400">
            {board.description}
          </p>
        )}
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const todos = currentTodos.filter(
            (t) => t.status === cat.name
          );

          return (
            <div
              key={cat.name}
              className="rounded-2xl bg-slate-900/40 border border-white/5
              flex flex-col p-5"
              style={{ borderTop: `4px solid ${cat.color}` }}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-5">
                <div
                  className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm"
                  style={{ color: cat.color }}
                >
                  {cat.icon}
                  {cat.name}
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800">
                  {todos.length}
                </span>
              </div>

              {/* Todos */}
              <div className="flex flex-col gap-3 flex-1">
                {todos.length === 0 && (
                  <p className="text-slate-500 text-sm italic text-center py-6">
                    No tasks here
                  </p>
                )}

                {todos.map((todo) => (
                  <div
                    key={todo._id}
                    className="rounded-xl bg-slate-900/60 border border-white/5
                    p-4 hover:border-indigo-500/40 transition group"
                  >
                    <h4 className="text-slate-100 font-semibold mb-3">
                      {todo.title}
                    </h4>

                    <div className="flex items-center justify-between">
                      <select
                        value={todo.status}
                        onChange={(e) =>
                          updateTodo(todo._id, {
                            status: e.target.value,
                          })
                        }
                        className="bg-transparent text-xs uppercase font-bold
                        text-slate-400 hover:text-white cursor-pointer outline-none"
                      >
                        <option className="bg-slate-800">Pending</option>
                        <option className="bg-slate-800">
                          In Progress
                        </option>
                        <option className="bg-slate-800">
                          Completed
                        </option>
                      </select>

                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-500/40 hover:text-red-500
                        transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Todo */}
                {cat.name === "Pending" && (
                  <div className="pt-2">
                    {!showAdd ? (
                      <button
                        onClick={() => setShowAdd(true)}
                        className="w-full py-3 rounded-xl border-2 border-dashed
                        border-slate-700 text-slate-500 hover:text-indigo-400
                        hover:border-indigo-500/60 transition
                        flex items-center justify-center gap-2"
                      >
                        <Plus size={18} /> Add Task
                      </button>
                    ) : (
                      <form onSubmit={handleAdd}>
                        <input
                          autoFocus
                          value={title}
                          onChange={(e) =>
                            setTitle(e.target.value)
                          }
                          onBlur={() =>
                            !title.trim() && setShowAdd(false)
                          }
                          placeholder="Enter task title..."
                          className="w-full px-4 py-3 rounded-xl
                          bg-slate-900 border border-indigo-500
                          text-white placeholder-slate-500
                          focus:outline-none"
                        />
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardDetail;
