import React, { useEffect, useState } from "react";
import useBoardStore from "../../store/useBoardStore";
import {
  Plus,
  Trash2,
  ChevronRight,
  Layout as LayoutIcon,
} from "lucide-react";

const BoardList = ({ onSelectBoard }) => {
  const { boards, fetchBoards, createBoard, deleteBoard, loading } =
    useBoardStore();

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createBoard(name.trim(), description.trim());
    setName("");
    setDescription("");
    setShowAdd(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-50">
            Your Boards
          </h2>
          <p className="text-slate-400 mt-2">
            Organize your work & tasks
          </p>
        </div>

        <button
          onClick={() => setShowAdd((p) => !p)}
          className="flex items-center gap-2 px-5 py-3
          bg-indigo-500 hover:bg-indigo-400
          text-white font-semibold rounded-xl
          transition shadow-lg shadow-indigo-500/30"
        >
          <Plus size={18} />
          New Board
        </button>
      </div>

      {/* Create Board */}
      {showAdd && (
        <div className="max-w-xl mb-10 rounded-2xl bg-slate-900/80
        border border-indigo-500/30 backdrop-blur-xl
        p-6 shadow-2xl animate-fade-in">
          <form onSubmit={handleCreate}>
            <h3 className="text-xl font-bold mb-4 text-slate-50">
              Create Board
            </h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Board name"
              required
              className="w-full mb-4 px-4 py-2.5 rounded-lg
              bg-slate-900 border border-slate-700
              text-slate-100 placeholder-slate-500
              focus:outline-none focus:border-indigo-500"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full mb-5 px-4 py-2.5 rounded-lg
              bg-slate-900 border border-slate-700
              text-slate-100 placeholder-slate-500
              focus:outline-none focus:border-indigo-500
              min-h-[90px]"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg
                bg-indigo-500 hover:bg-indigo-400
                text-white font-semibold transition"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-6 py-2 rounded-lg
                bg-slate-800 hover:bg-slate-700
                text-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Boards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board._id}
            onClick={() => onSelectBoard(board)}
            className="group cursor-pointer rounded-2xl
            bg-slate-900/80 border border-slate-800
            hover:border-indigo-500/60
            p-6 backdrop-blur-xl
            transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div
                  className="p-3 rounded-xl bg-indigo-500/10
                  text-indigo-400 group-hover:bg-indigo-500/25 transition"
                >
                  <LayoutIcon size={22} />
                </div>

                <div className="min-w-0">
                  <h4 className="text-lg font-semibold text-slate-50 truncate">
                    {board.name}
                  </h4>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                    {board.description || "No description"}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this board?")) {
                    deleteBoard(board._id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100
                p-2 rounded-lg hover:bg-red-500/15
                text-red-400 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end
            text-xs font-semibold uppercase tracking-wide
            text-indigo-400 group-hover:text-indigo-300
            gap-1 transition">
              View Board <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && boards.length === 0 && (
        <div className="mt-16 py-24 rounded-3xl
        bg-slate-900/40 border border-white/5
        flex flex-col items-center text-center text-slate-500">
          <LayoutIcon size={72} className="opacity-10 mb-6" />
          <p className="text-xl font-semibold">No boards yet</p>
          <p className="mt-2">
            Create your first board to get started 🚀
          </p>
        </div>
      )}
    </div>
  );
};

export default BoardList;
