import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import websiteLogo from "../Images/websiteLogo.png";

const WelcomeAnimation = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-10">
      <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl border border-green-500/40 bg-white/5 shadow-2xl">
        <img src={websiteLogo} alt="CryptoMap logo" className="h-20 w-20" />
        <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-r from-green-400/10 via-transparent to-green-400/10" />
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-green-300">Authentication successful</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Welcome{userData?.name ? `, ${userData.name}` : ""}
        </h1>
        <p className="mt-4 max-w-lg text-base text-slate-300 sm:text-lg">
          Redirecting you to the CryptoMap home experience with a quick intro animation.
        </p>
      </div>

      <div className="mt-12 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
        <div className="h-3 w-3 rounded-full bg-green-500 animate-[pulse_0.9s_ease-in-out_infinite] animation-delay-200" />
        <div className="h-3 w-3 rounded-full bg-green-500 animate-[pulse_0.9s_ease-in-out_infinite] animation-delay-400" />
      </div>
    </div>
  );
};

export default WelcomeAnimation;
