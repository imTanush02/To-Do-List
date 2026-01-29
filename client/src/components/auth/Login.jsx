import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { LogIn, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email.trim(), password);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-fade-in">
      <div
        className="w-full max-w-[420px] rounded-3xl
        bg-slate-900/80 backdrop-blur-xl
        border border-white/10
        p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/15 mb-4">
            <LogIn size={40} className="text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-50">
            Welcome back
          </h2>
          <p className="text-slate-400 mt-1">
            Sign in to manage your boards
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-slate-400">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2
                text-slate-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl
                bg-slate-900 border border-slate-700
                text-slate-100 placeholder-slate-500
                focus:outline-none focus:border-indigo-500
                transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-slate-400">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2
                text-slate-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl
                bg-slate-900 border border-slate-700
                text-slate-100 placeholder-slate-500
                focus:outline-none focus:border-indigo-500
                transition"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 text-sm text-red-400
            bg-red-500/10 border border-red-500/20
            rounded-lg px-3 py-2 text-center">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold
            transition-all
            ${
              loading
                ? "bg-indigo-500/60 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-0.5"
            }
            text-white shadow-lg shadow-indigo-500/30`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-slate-400 text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => (window.location.hash = "#signup")}
              className="text-indigo-400 hover:text-indigo-300
              font-semibold transition"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
