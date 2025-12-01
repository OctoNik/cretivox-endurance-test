"use client";

import React from "react";

function Footer() {
  return (
    <footer className="bg-black py-8 text-center text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span
            className="
              inline-block
              text-shimmer-effect
            "
          >
            Nikolaus Nathaniel.
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
