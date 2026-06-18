import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import websiteLogo from "../Images/websiteLogo.png";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate("/home", { replace: true });
    }
  }, [userData, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validUsername = "arjun";
    const validPassword = "7507";

    if (username.toLowerCase() === validUsername && password === validPassword) {
      setUserData({ username: validUsername, name: "Arjun" });
      navigate("/welcome");
      return;
    }

    setError("Invalid credentials.");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-inner shadow-slate-950/40">
          <div className="flex items-center gap-4">
            <img src={websiteLogo} alt="CryptoMap logo" className="h-14 w-14 rounded-xl bg-white/5 p-2" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Login to CryptoMap</h1>
              <p className="mt-2 text-sm text-slate-400">Secure access to your blockchain experience.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-medium text-slate-200">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-green-500"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-green-500"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-green-400"
          >
            Sign In
          </button>
          {error && (
            <p className="mt-2 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here? <Link to="/" className="font-semibold text-white hover:text-green-300">Return home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
