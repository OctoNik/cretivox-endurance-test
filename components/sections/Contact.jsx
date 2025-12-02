"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lanyard from "../3d/Lanyard";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const manifestRef = useRef(null);
  const futureRef = useRef(null);
  const cretivoxRef = useRef(null);

  const [showLanyard, setShowLanyard] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const triggerOpts = {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      };

      gsap.fromTo(
        manifestRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: triggerOpts,
        }
      );

      gsap.fromTo(
        futureRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: triggerOpts,
        }
      );

      gsap.fromTo(
        cretivoxRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: triggerOpts,
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => setShowLanyard(true),
        once: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      className="relative h-screen bg-transparent overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 z-0 w-full h-full flex flex-col justify-center items-center pointer-events-none select-none">
        <div
          ref={manifestRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-32 md:mt-0"
        >
          <p className="text-white/40 text-lg md:text-xl font-bold tracking-[0.3em]">
            Soon to be
          </p>
        </div>

        <div className="w-full h-full flex justify-between px-2 md:px-30">
          {/* FUTURE */}
          <div
            ref={futureRef}
            className="h-full flex items-start justify-start"
          >
            <h1
              className="text-[12vh] md:text-[17vh] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-white/5 hidden md:block tracking-widest"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              FUTURE
            </h1>
          </div>

          {/* CRETIVOX */}
          <div
            ref={cretivoxRef}
            className="h-full flex items-start justify-end"
          >
            <h1
              className="text-[12vh] md:text-[17vh] font-black text-transparent bg-clip-text bg-gradient-to-t from-white/50 to-white/5 hidden md:block tracking-widest"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              CRETIVOX
            </h1>
          </div>
        </div>

        <div className="absolute bottom-20 w-full text-center md:hidden">
          <p className="text-white/40 text-5xl font-black">
            FUTURE
            <br />
            CRETIVOX
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-10 w-full h-full">
        {showLanyard && <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />}
      </div>
    </section>
  );
}

export default Contact;
