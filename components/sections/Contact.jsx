"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const iconsRef = useRef(null);
  const emailRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const triggers = [];
      const elementsToAnimate = [
        headingRef.current,
        paragraphRef.current,
        iconsRef.current,
        emailRef.current,
      ];

      gsap.set(elementsToAnimate, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      elementsToAnimate.forEach((el, index) => {
        if (el) {
          const tween = tl.to(
            el,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            index * 0.15
          );
        }
      });

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
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
    <section id="contact" className="py-24 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3EE08F] to-[#0A4F6B] mb-6"
        >
          Get In Touch
        </h2>
        <p
          ref={paragraphRef}
          className="text-lg text-gray-300 mb-12 leading-relaxed"
        >
          I’m always open to discussing new projects, creative ideas or
          opportunities to be part of your visions. Feel free to reach out!
        </p>
        <div
          ref={iconsRef}
          className="flex justify-center space-x-6 md:space-x-8 mb-12"
        >
          <a
            href="https://linkedin.com/in/nikolausnathaniel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#3EE08F] transition duration-300 text-3xl md:text-4xl transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/OctoNik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#3EE08F] transition duration-300 text-3xl md:text-4xl transform hover:scale-110"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://instagram.com/nath.laus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#3EE08F] transition duration-300 text-3xl md:text-4xl transform hover:scale-110"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div
          ref={emailRef}
          className="flex items-center justify-center space-x-3 text-lg text-gray-300"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-[#3EE08F]" />
          <a
            href="mailto:nikolauscontact@gmail.com"
            className="hover:text-[#3EE08F] transition duration-300"
          >
            nikolauscontact@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
