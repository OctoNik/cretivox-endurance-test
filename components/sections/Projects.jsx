"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import projectsData from "../../data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black dark:text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

function Projects({ activeProject, setActiveProject }) {
  const id = useId();
  const modalRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsListRef = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setActiveProject]);

  useOutsideClick(modalRef, () => setActiveProject(null));

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "auto";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "auto";
    };
  }, [activeProject]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const triggers = [];

      if (headingRef.current) {
        const headingTween = gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
        triggers.push(headingTween.scrollTrigger);
      }

      if (cardsListRef.current) {
        const cards = gsap.utils.toArray(".project-card-item");
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 50 });
          const cardsTween = gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsListRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
          triggers.push(cardsTween.scrollTrigger);
        }
      }

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        clearTimeout(refreshTimeout);
        triggers.forEach((trigger) => trigger && trigger.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" className="py-20 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3EE08F] to-[#0A4F6B] mb-16 pb-2"
        >
          My Projects
        </h2>

        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-10"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeProject ? (
            <div className="fixed inset-0 grid place-items-center z-[100] p-4 overflow-hidden">
              <motion.button
                key={`button-${activeProject.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.05 },
                }}
                className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white dark:bg-gray-800 rounded-full h-8 w-8 z-[110]"
                onClick={() => setActiveProject(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${activeProject.title}-${id}`}
                ref={modalRef}
                className="w-full max-w-xl h-auto max-h-[90vh] flex flex-col bg-gray-900 rounded-2xl overflow-hidden shadow-2xl will-change-transform"
              >
                <motion.div>
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-60 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-60 bg-gray-700 items-center justify-center text-gray-500"
                    style={{ display: "none" }}
                  >
                    {" "}
                    Image Error/Not Found{" "}
                  </div>
                </motion.div>
                <div className="flex flex-col p-6 overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-white text-2xl mb-1">
                        {activeProject.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {activeProject.description}
                      </p>
                    </div>
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs rounded-full font-bold bg-[#0A4F6B] hover:bg-[#19B698] text-white whitespace-nowrap transition-colors"
                    >
                      {" "}
                      View Project{" "}
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech?.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-[#0A4F6B] text-[#E0F2FE] text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      )) ?? (
                        <span className="text-xs text-gray-500">
                          Not specified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <ul
          ref={cardsListRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {projectsData.map((card) => (
            <motion.li
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActiveProject(card)}
              className="project-card-item relative p-4 bg-gray-900 hover:bg-gray-800 rounded-xl cursor-pointer shadow-md transition-colors will-change-transform"
            >
              <div className="flex flex-col gap-4 w-full">
                <motion.div>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-48 w-full rounded-lg object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full h-48 rounded-lg bg-gray-700 items-center justify-center text-gray-500"
                    style={{ display: "none" }}
                  >
                    {" "}
                    Image Error/Not Found{" "}
                  </div>
                </motion.div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-semibold text-white text-lg mt-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
