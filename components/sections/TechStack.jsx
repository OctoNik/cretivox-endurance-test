"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faPython,
  faPhp,
  faNodeJs,
  faLaravel,
  faGitAlt,
  faMicrosoft,
  faFlutter,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { faCode, faDatabase } from "@fortawesome/free-solid-svg-icons";

const languagesAndTools = [
  { icon: faHtml5, title: "HTML", color: "#E44D26" },
  { icon: faCss3Alt, title: "CSS", color: "#1572B6" },
  { icon: faJs, title: "JavaScript", color: "#F7DF1E" },
  { icon: faPython, title: "Python", color: "#3776AB" },
  { icon: faPhp, title: "PHP", color: "#777BB4" },
  { icon: faMicrosoft, title: "VB.NET", color: "#512BD4" },
  { icon: faDatabase, title: "MS SQL Server", color: "#CC2927" },
  { icon: faDatabase, title: "PostgreSQL", color: "#4169E1" },
  { icon: faDatabase, title: "MongoDB", color: "#47A248" },
  { icon: faGitAlt, title: "Git", color: "#F05032" },
  { icon: faCode, title: "VS Code", color: "#007ACC" },
];

const frameworksAndLibraries = [
  { icon: faReact, title: "React", color: "#61DAFB" },
  { icon: faCode, title: "Next.js", color: "#FFFFFF" },
  { icon: faCss3Alt, title: "Tailwind", color: "#38B2AC" },
  { icon: faNodeJs, title: "Node.js", color: "#339933" },
  { icon: faLaravel, title: "Laravel", color: "#FF2D20" },
  { icon: faFlutter, title: "Flutter", color: "#02569B" },
  { icon: faMicrosoft, title: "ASP.NET", color: "#512BD4" },
];

function LogoMarquee({ items, direction = "left", speed = 50 }) {
  const estimatedWidthPerItem = 110;
  const totalWidth = items.length * 2 * estimatedWidthPerItem;
  const duration = totalWidth / speed;

  const scrollStyle = {
    "--duration": `${duration}s`,
    animationName: `scroll-${direction}`,
    animationDuration: "var(--duration)",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  };

  return (
    <div className="w-full overflow-hidden group py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={scrollStyle}
      >
        {[...items, ...items].map((logo, index) => (
          <div
            key={`${logo.title}-${index}`}
            className="flex-shrink-0 mx-6"
            style={{ width: `${estimatedWidthPerItem}px` }}
          >
            <div className="flex flex-col items-center text-center gap-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
              <FontAwesomeIcon
                icon={logo.icon}
                className="text-4xl md:text-5xl"
                style={{ color: logo.color }}
              />
              <span className="text-gray-300 text-xs md:text-sm font-medium mt-2 whitespace-nowrap">
                {logo.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="tools" className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3EE08F] to-[#0A4F6B]">
          Tech Stack
        </h2>
      </div>

      <div className="flex flex-col gap-10 max-w-5xl mx-auto w-full px-4">
        <LogoMarquee items={languagesAndTools} direction="left" speed={60} />

        <LogoMarquee
          items={frameworksAndLibraries}
          direction="right"
          speed={60}
        />
      </div>
    </section>
  );
}
