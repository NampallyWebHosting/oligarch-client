import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const textGroups = [
  [
    "I am the force that elevates",
    "young entrepreneurs worldwide,",
    "propelling them beyond limits",
    "and expectations.",
  ],
  [
    "Rising gracefully with every",
    "decisive stride, I ignite startups",
    "with fresh brilliance.",
  ],
  [
    "I embody a unique fusion of",
    "engineering precision, artistic",
    "creativity, cutting-edge technology,",
    "and strategic business acumen.",
  ],
  [
    "I am the driving spirit behind",
    "shared aspirations and an",
    "entrepreneurial alliance spanning",
    "multiple states.",
  ],
  [
    "I nurture dreams, instill courage,",
    "evoke emotions, and spark both",
    "creative and pragmatic thinking.",
  ],
  [
    "I serve as the beacon that draws",
    "visionary entrepreneurs, capturing",
    "their dynamic pitches.",
  ],
  [
    "A sanctuary for the world’s most",
    "innovative minds and the epitome",
    "of excellence.",
  ],
  [
    "More than a fleeting moment,",
    "I sculpt the milestones for",
    "generations to come with a",
    "sense of purpose.",
  ],
  ["I am The Oligarch."],
];

const HorizontalScrollText: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: `+=${textGroups.length * 100}%`,
        scrub: 1,
        snap: { snapTo: "labels", duration: 0.5, ease: "power1.inOut" },
        invalidateOnRefresh: true,
      },
    });

    textGroups.forEach((_, index) => {
      const textElement = textRefs.current[index];

      if (textElement) {
        // Hide all text initially
        gsap.set(textElement, { opacity: 0, y: 50, scale: 0.95 });

        // Show current paragraph with scale effect
        timeline.to(
          textElement,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          index
        );

        // Hide previous paragraph
        if (index > 0) {
          const prevTextElement = textRefs.current[index - 1];
          timeline.to(
            prevTextElement,
            {
              opacity: 0,
              y: -50,
              scale: 0.95,
              duration: 0.8,
              ease: "power2.out",
            },
            index - 0.2
          );
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="relative w-full flex flex-col items-center text-center font-montserrat">
        {textGroups.map((group, index) => (
          <motion.div
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-start text-white text-base sm:text-2xl md:text-4xl lg:text-5xl font-light opacity-0 lg:leading-[100%] tracking-wide w-full px-4"
            style={{
              textShadow: "0px 4px 12px rgba(255, 255, 255, 0.3)", // Soft glow effect
            }}
          >
            <div className="w-full lg:max-w-[70%] mr-auto text-left">
              {group.map((line, lineIndex) => (
                <p key={lineIndex} className="mb-1">{line}</p>
              ))}
            </div>
          </motion.div>



        ))}

      </div>
    </div>

  );
};

export default HorizontalScrollText;
