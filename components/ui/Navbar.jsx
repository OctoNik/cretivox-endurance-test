"use client";

import React, { useState, useEffect } from "react";
import PillNav from "./PillNav";
import Cookies from "js-cookie";

// TAMBAHAN: Menu Logout dimasukkan ke sini dengan properti khusus 'isLogout: true'
const navItems = [
  { label: "Home", href: "#home", hideInNav: true },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Logout", href: "#logout", isLogout: true }, // Menu Baru
];

function Navbar() {
  const [activeHref, setActiveHref] = useState("#home");

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  useEffect(() => {
    // Filter hanya item yang punya ID halaman (bukan logout)
    const sections = navItems
      .filter((item) => !item.isLogout && !item.hideInNav)
      .map((item) => document.getElementById(item.href.substring(1)));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = "#home";

      for (const section of sections) {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          currentSection = `#${section.id}`;
          break;
        }
      }
      setActiveHref((prev) =>
        prev !== currentSection ? currentSection : prev
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Container dikembalikan sederhana karena hanya ada 1 elemen (PillNav)
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <PillNav
          logo="/favicon.ico"
          logoAlt="Logo"
          items={navItems}
          activeHref={activeHref}
          onLogout={handleLogout} // Oper fungsi logout ke PillNav
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#000000ff"
          pillColor="#0A4F6B"
          hoveredPillTextColor="#3EE08F"
          pillTextColor="#FFFFFF"
        />
      </div>
    </div>
  );
}

export default Navbar;
