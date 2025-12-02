"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
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
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      leftEl,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      0
    ).fromTo(
      rightEl,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      0.2
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
          <div
            ref={leftColRef}
            className="lg:col-span-2 flex flex-col items-center"
          >
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 280, height: 350 }}
              cardsData={aboutImages}
            />
            <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm animate-pulse">
              <FontAwesomeIcon icon={faHandPointer} className="w-4 h-4" />
              <span className="tracking-widest uppercase text-xs font-semibold">
                Klik trus Drag foto-fotonya!
              </span>
            </div>
          </div>

          <div
            ref={rightColRef}
            className="lg:col-span-3 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3EE08F] to-[#0A4F6B] mb-6">
              About Me
            </h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Kenalin, gua{" "}
                <span className="text-[#3EE08F] font-semibold">Niko</span>.
                Mahasiswa IT di Universitas Tarumanagara yang lagi tertarik
                banget sama dunia{" "}
                <span className="font-mono text-[#0A4F6B] bg-white/5 px-1 rounded mx-1">
                  Software Development
                </span>{" "}
                dan{" "}
                <span className="font-mono text-[#0A4F6B] bg-white/5 px-1 rounded mx-1">
                  NLP
                </span>
                . Buat gua, ngoding itu seru dan bikin ketagihan, kayak ada
                kepuasan tersendiri (walaupun gua gak jago sih).
              </p>

              <p>
                Di balik layar, gua orangnya <em>introvert</em>. Jadi mungkin
                agak butuh waktu buat gua bisa bener-bener akrab kalau ketemu
                orang baru,{" "}
                <strong>tapi bukan berarti gua gak bisa punya temen ya!</strong>{" "}
                Hobi gua simpel: suka eksplor wisata, <em>hunting</em> makanan
                enak, sama main badminton, oh iya 1 lagi{" "}
                <strong> TIDUR </strong>.
              </p>

              <div className="pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-500 italic">
                  "Stay grounded, grateful, and keep exploring."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
