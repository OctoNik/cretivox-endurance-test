"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Komponen UI
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import LoginModal from "../components/ui/LoginModal";

// Komponen Sections
import Header from "../components/sections/Header";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import TechStack from "../components/sections/TechStack";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  const [activeProject, setActiveProject] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsAuthenticated(true);

      if (
        typeof window !== "undefined" &&
        sessionStorage.getItem("login_success")
      ) {
        toast.success("Kamu Berhasil Login", {
          duration: 3000,
          icon: "🔓",
        });

        sessionStorage.removeItem("login_success");
      }
    }

    setIsChecking(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  if (isChecking) return <div className="min-h-screen bg-black" />;

  return (
    <main
      className={`bg-black text-gray-100 font-sans ${
        !isAuthenticated ? "h-screen overflow-hidden" : "min-h-screen"
      }`}
    >
      {isAuthenticated && !activeProject && <Navbar />}

      <Header />

      {!isAuthenticated && <LoginModal onLoginSuccess={handleLoginSuccess} />}

      {isAuthenticated && (
        <>
          <About />
          <Experience />
          <TechStack />
          <Projects
            activeProject={activeProject}
            setActiveProject={setActiveProject}
          />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
