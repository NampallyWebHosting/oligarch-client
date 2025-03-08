import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Registering GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Defining text groups for animated display
const textGroups = [
  [
    "Oligarch Holdings empowers",
    "innovative businesses to",
    "transform industries. It aims to",
  ],
  [
    "create an ecosystem where",
    "technology, creativity, and",
    "services meet various needs,",
  ],
  ["achieving financial success with", "a sense of purpose."],
];

const HorizontalScrollText: React.FC = () => {
  // Refs for section and text elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const ghostRefs = useRef<(HTMLDivElement | null)[][]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${textGroups.length * 100}%`, // Dynamic scroll length
        scrub: 1,
        snap: 1 / (textGroups.length - 1),
        invalidateOnRefresh: true,
      },
    });

    // Loop through text groups to apply animations
    textGroups.forEach((group, groupIndex) => {
      group.forEach((_, lineIndex) => {
        const textElement = textRefs.current[groupIndex]?.[lineIndex];
        const ghostElement = ghostRefs.current[groupIndex]?.[lineIndex];

        if (textElement && ghostElement) {
          // Initial ghost text setup: starts off-screen to the right
          gsap.set(ghostElement, { x: "100vw", opacity: 1 });

          // Move ghost text in to align with main text
          timeline.to(
            ghostElement,
            {
              x: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            groupIndex
          );

          // Highlight main text
          timeline.to(
            textElement,
            {
              color: "#fff",
              scale: 1.2,
              opacity: 1,
            },
            groupIndex
          );

          // Fade out ghost text after alignment
          timeline.to(
            ghostElement,
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            groupIndex + 0.5 // Delayed fade-out
          );

          // Ensure main text remains highlighted
          timeline.set(textElement, { color: "#fff", scale: 1.2, opacity: 1 });
        }
      });
    });

    // Cleanup function to remove ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="relative w-full flex flex-col items-start gap-1.5 pl-[20vw]">
        {textGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="relative w-full">
            {group.map((line, lineIndex) => (
              <div key={lineIndex} className="relative w-full">
                {/* Ghost Text (Starts off-screen to the right) */}
                <motion.div
                  ref={(el) => {
                    if (!ghostRefs.current[groupIndex]) ghostRefs.current[groupIndex] = [];
                    ghostRefs.current[groupIndex][lineIndex] = el;
                  }}
                  className="absolute font-bold text-[#FFFAF3] text-[46px] leading-[100%] tracking-[0]"
                >
                  {line}
                </motion.div>

                {/* Main Text (Initially dimmed) */}
                <motion.div
                  ref={(el) => {
                    if (!textRefs.current[groupIndex]) textRefs.current[groupIndex] = [];
                    textRefs.current[groupIndex][lineIndex] = el;
                  }}
                  className="text-[46px] leading-[100%] tracking-[0] font-semibold text-[#FFFAF352] opacity-100 font-montserrat"
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollText;