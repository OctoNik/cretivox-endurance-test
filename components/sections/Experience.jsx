"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import experiences from "../../data/experience.json";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      const items = gsap.utils.toArray(".experience-item");
      items.forEach((item) => {
        const leftContent = item.querySelector(".left-content");
        const rightContent = item.querySelector(".right-content");
        const dot = item.querySelector(".timeline-dot");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(dot, { scale: 0, duration: 0.4, ease: "back.out(2)" });

        if (leftContent) {
          tl.from(
            leftContent,
            { x: -50, opacity: 0, duration: 0.6, ease: "power3.out" },
            "-=0.2"
          );
        }
        if (rightContent) {
          tl.from(
            rightContent,
            { x: 50, opacity: 0, duration: 0.6, ease: "power3.out" },
            "-=0.6"
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="experience"
      className="py-24 bg-black overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3EE08F] to-[#0A4F6B] mb-20 pb-2">
          Work Experience
        </h2>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2"></div>
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3EE08F] via-[#0A4F6B] to-[#3EE08F] -translate-x-1/2 origin-top"
          ></div>

          <div className="flex flex-col gap-16 md:gap-24">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="experience-item relative flex flex-col md:flex-row items-start md:items-center w-full"
                >
                  <div className="md:w-1/2 md:pr-12 w-full pl-12 md:pl-0 left-content mb-2 md:mb-0">
                    {isEven ? (
                      <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-[#3EE08F]/50 transition-colors shadow-lg text-left md:text-right">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ) : (
                      <div className="text-left md:text-right">
                        <span className="inline-block py-1 px-3 mb-2 rounded-full bg-[#0A4F6B]/20 text-[#3EE08F] text-sm font-bold border border-[#0A4F6B]/50">
                          {exp.year}
                        </span>
                        <h4 className="text-xl font-semibold text-gray-200">
                          {exp.company}
                        </h4>
                      </div>
                    )}
                  </div>

                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 md:top-auto flex items-center justify-center z-10">
                    <div className="timeline-dot w-4 h-4 bg-[#000] border-[3px] border-[#3EE08F] rounded-full shadow-[0_0_10px_#3EE08F]"></div>
                  </div>

                  <div className="md:w-1/2 md:pl-12 w-full pl-12 md:pl-0 right-content">
                    {isEven ? (
                      <div className="text-left">
                        <span className="inline-block py-1 px-3 mb-2 rounded-full bg-[#0A4F6B]/20 text-[#3EE08F] text-sm font-bold border border-[#0A4F6B]/50">
                          {exp.year}
                        </span>
                        <h4 className="text-xl font-semibold text-gray-200">
                          {exp.company}
                        </h4>
                      </div>
                    ) : (
                      // TAMPILAN CARD (Role & Desc)
                      <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-[#3EE08F]/50 transition-colors shadow-lg text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
