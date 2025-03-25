import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "@/assets/LionLogo.svg"

gsap.registerPlugin(ScrollTrigger);

const FullScreenWithLeftToRightFill: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [showIntro, setShowIntro] = useState(true);


  useEffect(() => {
    // Disable scrolling initially
    document.body.style.overflow = "hidden";

    gsap.to(".intro-screen", {
      opacity: 0,
      duration: 1.5,
      delay: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          setShowIntro(false);
          document.body.style.overflow = "auto"; // Re-enable scrolling after transition
        }, 100);
      },
    });

    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // === COMMON ANIMATION (Both Mobile & Desktop) ===
    gsap.set(section, { x: "100%", backgroundColor: "#000" }); // Start with black background

    gsap.to(section, {
      x: "0%", // Slide in from right to left
      duration: 1.5,
      delay: 1.5,
      ease: "power2.inOut",
    });

    // === DESKTOP ANIMATION (UNCHANGED) ===
    mm.add("(min-width: 768px)", () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      overlaysRef.current.forEach((overlay, index) => {
        if (overlay) {
          gsap.set(overlay, { right: 0, left: "auto", width: "0%" });

          tl.to(
            overlay,
            { width: "100%", duration: 1, ease: "power2.inOut", stagger: 0.2 * index },
            "<"
          );
        }
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, letterSpacing: "-5px", scale: 0.9 },
        { opacity: 1, letterSpacing: "0px", scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      );

      tl.to(
        linesRef.current.filter(Boolean),
        { opacity: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // REVERSED BACKGROUND TRANSITION
      tl.to(section, { backgroundColor: "#FFFAF3", duration: 1, ease: "power2.out" }, "-=0.5");
    });

    // === MOBILE ANIMATION (NEW) ===
    mm.add("(max-width: 767px)", () => {
      gsap.set(".vertical-lines", { display: "none" }); // Hide vertical lines
      gsap.set(".horizontal-line", { opacity: 1, width: "0%" });

      gsap.to(".horizontal-line", {
        width: "100%",
        duration: 1.5,
        delay: 1.5,
        ease: "power2.out",
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Upper section moves up, lower section moves down
      tl.to(".upper-section", { y: "-100%", duration: 1.5, ease: "power2.inOut" });
      tl.to(".lower-section", { y: "100%", duration: 1.5, ease: "power2.inOut" }, "<");

      // Text Reveal Animation (same as desktop)
      tl.fromTo(
        textRef.current,
        { opacity: 0, letterSpacing: "-3px", scale: 0.8 },
        { opacity: 1, letterSpacing: "0px", scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      );

      // HIDE the horizontal line after animation completes
      tl.to(".horizontal-line", { opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");
    });


    return () => {
      mm.revert();
      ScrollTrigger.killAll();
      document.body.style.overflow = "auto";
    };
  }, []);


  return (
    <div className="w-screen">
      {/* Initial Full-Screen Intro */}
      {showIntro && (
        <div className="intro-screen fixed top-0 left-0 w-screen h-screen bg-[#FFFAF3] flex items-center justify-center z-50">
          <img src={logo} alt="" className="md:max-w-md" />
        </div>
      )}

      {/* Main Animation Section */}
      <div ref={sectionRef} className="h-screen bg-black relative flex items-center justify-center overflow-hidden">
        {/* DESKTOP Overlays (Hidden on Mobile) */}
        <div className="hidden md:flex w-full h-full absolute top-0 left-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative w-1/4 h-full bg-black overflow-hidden">
              <div
                ref={(el) => {
                  overlaysRef.current[index] = el;
                }}
                className="overlay absolute left-0 top-0 w-0 h-full bg-[#FFFAF3] will-change-[width]"
              ></div>
            </div>
          ))}
        </div>

        {/* MOBILE Overlays (Upper & Lower Sections) */}
        <div className="md:hidden absolute top-0 left-0 w-full h-full flex flex-col bg-[#FFFAF3]">
          {/* Sliding Upper and Lower Sections */}
          <div className="upper-section w-full h-1/2 bg-black"></div>
          <div className="lower-section w-full h-1/2 bg-black"></div>
        </div>


        {/* Horizontal Line (Hidden After Animation) */}
        <div className="horizontal-line md:hidden absolute w-0 h-[2px] bg-white top-1/2 left-0"></div>

        {/* Centered Animated Text */}
        <div
          ref={textRef}
          className="absolute text-black font-normal leading-[100%] tracking-[0%] font-sedan text-[3.5rem] md:text-[123.59px] lg:text-[173.59px] opacity-0"
        >
          OLIGARCH
        </div>

        {/* Thin Vertical Lines (Hidden on Mobile) */}
        <div className="vertical-lines hidden md:block">
          {["left-1/4", "left-1/2", "left-3/4"].map((pos, idx) => (
            <div
              key={idx}
              ref={(el) => {
                linesRef.current[idx] = el;
              }}
              className={`absolute ${pos} top-0 w-0.5 h-full bg-white`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default FullScreenWithLeftToRightFill;
