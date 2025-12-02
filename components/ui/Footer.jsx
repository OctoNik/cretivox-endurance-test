"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-800 relative z-50">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="https://linkedin.com/in/nikolausnathaniel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#3EE08F] transition duration-300 text-2xl transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/OctoNik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#3EE08F] transition duration-300 text-2xl transform hover:scale-110"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://instagram.com/nath.laus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#3EE08F] transition duration-300 text-2xl transform hover:scale-110"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="mailto:nikolauscontact@gmail.com"
            className="text-gray-400 hover:text-[#3EE08F] transition duration-300 text-2xl transform hover:scale-110"
            aria-label="Email"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-shimmer-effect font-medium">
            Nikolaus Nathaniel.
          </span>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
