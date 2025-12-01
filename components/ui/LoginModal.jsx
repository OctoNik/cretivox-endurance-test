"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function LoginModal({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set("token", data.accessToken, {
          expires: 7,
          sameSite: "strict",
          secure: true,
        });

        sessionStorage.setItem("login_success", "true");

        window.location.reload();
      } else {
        toast.error(data.message || "Cek lagi username & passwordnyaa.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all">
      <div className="w-full max-w-sm bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-300">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
            <FontAwesomeIcon icon={faLock} className="text-2xl text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-1">Konten Rahasia</h2>
        <p className="text-white/60 text-sm mb-6">Eitss.. Login Duluuu</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            disabled={loading}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#3EE08F] transition-all text-sm disabled:opacity-50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#3EE08F] transition-all text-sm disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#3EE08F] hover:bg-[#2db873] text-black font-bold py-3.5 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(62,224,143,0.4)] flex items-center justify-center gap-2 h-[52px]"
          >
            {loading ? (
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-black rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                <span className="w-2 h-2 bg-black rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                <span className="w-2 h-2 bg-black rounded-full animate-[bounce_1s_infinite_400ms]"></span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
