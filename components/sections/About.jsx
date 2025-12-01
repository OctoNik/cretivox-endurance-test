"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stack from "../ui/Stack";
import aboutImages from "../../data/about.json";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    if (!leftColRef.current || !rightColRef.current) {
      return;
    }

    const leftEl = leftColRef.current;
    const rightEl = rightColRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftEl.closest("section"),
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      leftEl,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      0
    ).fromTo(
      rightEl,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      0
    );

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-center max-w-5xl mx-auto">
          <div ref={leftColRef} className="lg:col-span-2 flex justify-center">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 300, height: 300 }}
              cardsData={aboutImages}
            />
          </div>
          <div ref={rightColRef} className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3EE08F] to-[#0A4F6B] mb-6">
              About Me
            </h2>
            <div className="text-lg leading-relaxed text-gray-300 text-center md:text-left">
              <p className="mb-4">
                Hi! I'm Niko, an IT student at Universitas Tarumanagara with a
                strong passion for Software Development and Natural Language
                Processing. I enjoy collaborating and tackling challenges to
                build innovative tech solutions, always eager to learn and grow
                in the field.
              </p>
              <p>
                Beyond coding, I enjoy exploring new places and foods, and
                finding beauty in the surroundings - a reminder to stay grounded
                and grateful. I also love playing badminton and spending time
                with my dog!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
