import React, { useEffect, useState } from "react";
import useAuthStore from "./store/useAuthStore";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import BoardList from "./components/board/BoardList";
import BoardDetail from "./components/board/BoardDetail";
import { LogOut, Layout } from "lucide-react";

const App = () => {
  const { user, logout } = useAuthStore();

  const getViewFromHash = () =>
    window.location.hash.replace("#", "") || "login";

  const [view, setView] = useState(getViewFromHash());

  /* 🔁 Hash change listener */
  useEffect(() => {
    const onHashChange = () => setView(getViewFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* 🔐 Auth Guard */
  useEffect(() => {
    if (user && (view === "login" || view === "signup")) {
      window.location.hash = "#dashboard";
    }

    if (!user && view !== "login" && view !== "signup") {
      window.location.hash = "#login";
    }
  }, [user, view]);

  const handleSelectBoard = (board) => {
    window.location.hash = `#board-${board._id}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 px-6 md:px-12 py-5
        backdrop-blur-2xl bg-slate-950/80
        border-b border-white/5 flex items-center justify-between"
      >
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => (window.location.hash = "#dashboard")}
        >
          <div
            className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400
            group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            <Layout size={20} className="text-white" />
          </div>

          <h1 className="text-xl font-black tracking-tight tracking-tighter">
            PRO<span className="text-indigo-400">TASK</span>
          </h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs md:text-sm text-slate-400">
              {user.email}
            </span>

            <button
              onClick={logout}
              className="flex items-center gap-2
              px-3 py-1.5 md:px-4 md:py-2
              bg-red-500/10 hover:bg-red-500
              text-red-400 hover:text-white
              rounded-lg transition shadow-sm
              hover:shadow-red-500/30
              text-xs md:text-sm font-semibold"
            >
              <LogOut size={16} />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        )}
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto py-10 px-4 md:px-8">
        {view === "login" && (
          <div className="max-w-md mx-auto">
            <Login />
          </div>
        )}

        {view === "signup" && (
          <div className="max-w-md mx-auto">
            <Signup />
          </div>
        )}

        {view === "dashboard" && (
          <div className="rounded-3xl glass-panel p-1">
            <BoardList onSelectBoard={handleSelectBoard} />
          </div>
        )}

        {view.startsWith("board-") && (
          <div className="rounded-3xl glass-panel p-1">
            <BoardDetail boardId={view.replace("board-", "")} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
