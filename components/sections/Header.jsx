"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faMousePointer } from "@fortawesome/free-solid-svg-icons";
import { TypeAnimation } from "react-type-animation";
import SphereBackground from "../3d/SphereBackground";

gsap.registerPlugin(useGSAP);

const maxWordWidth = "5ch";

function Header() {
  const containerRef = useRef(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(true);

  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const mouseTextRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(
    () => {
      if (!backgroundLoaded || !containerRef.current) return;

      const elementsToAnimate = [
        heading1Ref.current,
        heading2Ref.current,
        mouseTextRef.current,
        buttonRef.current,
      ];

      gsap.set(elementsToAnimate, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(
        heading1Ref.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.1
      )
        .to(
          heading2Ref.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          buttonRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          mouseTextRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        ); // Muncul terakhir
    },
    { dependencies: [backgroundLoaded], scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-start text-left overflow-hidden bg-black"
    >
      <div className="canvas-container absolute inset-0 z-0">
        <SphereBackground />
      </div>

      <div className="relative z-10 p-4 pl-12 md:pl-24 lg:pl-32">
        <h1
          ref={heading1Ref}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 flex items-center gap-4"
        >
          <TypeAnimation
            sequence={["Hi!", 2000, "Hola!", 2000, "Hello!", 2000]}
            wrapper="span"
            speed={40}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#3EE08F] to-[#0A4F6B] inline-block"
            style={{ width: maxWordWidth, display: "inline-block" }}
            repeat={Infinity}
          />
          <img
            src="/cretivoxlogo.svg"
            alt="Cretivox Logo"
            className="h-8 sm:h-12 lg:h-16 w-auto object-contain bg-white p-1 rounded-md ml-2"
          />
        </h1>
        <h2
          ref={heading2Ref}
          className="text-3xl md:text-5xl font-medium text-gray-300 mb-10"
        >
          Welcome to My Web
        </h2>

        <a
          ref={buttonRef}
          href="#about"
          className="bg-[#0A4F6B] hover:bg-[#19B698] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center gap-2"
        >
          Know Me More
          <FontAwesomeIcon
            icon={faArrowDown}
            className="w-4 h-4 animate-bounce"
          />
        </a>
      </div>

      <div
        ref={mouseTextRef}
        className="absolute bottom-24 right-8 md:bottom-12 md:right-16 z-20 flex items-center gap-3 text-gray-400 opacity-0"
      >
        <p className="text-sm md:text-base font-medium tracking-wide">
          Hover the sphere
        </p>
        <FontAwesomeIcon
          icon={faMousePointer}
          className="text-[#3EE08F] w-5 h-5 animate-pulse"
        />
      </div>
    </section>
  );
}

export default Header;
