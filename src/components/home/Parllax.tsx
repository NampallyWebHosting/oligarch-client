import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import logo from "@/assets/Use this for svg.svg";

const LandingPage = () => {
  const [showCurtain, setShowCurtain] = useState(false);
  const [showLines, setShowLines] = useState(false);
  const [showMask, setShowMask] = useState(false);

  const curtainRef = useRef<HTMLDivElement>(null);
  const rightMaskRef = useRef<HTMLDivElement>(null);
  const secondMaskRef = useRef<HTMLDivElement>(null);
  const thirdMaskRef = useRef<HTMLDivElement>(null);
  const fourthMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCurtain(true);

      // Animate the black screen sliding in
      gsap.to(curtainRef.current, {
        x: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          setShowLines(true); // Show white lines after animation ends

          // Start first masking animation (Expands 232px from right)
          setTimeout(() => {
            setShowMask(true);

            gsap.to(rightMaskRef.current, {
              width: "232px",
              duration: 1.2,
              ease: "power2.inOut",
              onComplete: () => {
                // Start second masking animation (Expands to Center)
                gsap.to(secondMaskRef.current, {
                  width: `calc(50vw - 232px)`,
                  duration: 1.2,
                  ease: "power2.inOut",
                  onComplete: () => {
                    // Start third masking animation (Expands after Second)
                    gsap.to(thirdMaskRef.current, {
                      width: `calc(50vw - 232px)`,
                      duration: 1.2,
                      ease: "power2.inOut",
                      onComplete: () => {
                        // Start fourth masking animation (Expands to Leftmost Line)
                        gsap.to(fourthMaskRef.current, {
                          width: "calc(100vw - (68vw + 232px))",
                          duration: 1.2,
                          ease: "power2.inOut",
                        });
                      },
                    });
                  },
                });
              },
            });
          }, 500); // Small delay after lines appear
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-[#FFFAF3] flex items-center justify-center overflow-hidden">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-[500px]" />

      {/* Black Curtain */}
      {showCurtain && (
        <motion.div
          ref={curtainRef}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-black"
        >
          {/* White Vertical Lines (Appear only after animation completes) */}
          {showLines && (
            <>
              <div className="absolute top-0 bottom-0 w-[2px] bg-white left-[232px]" />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white left-1/2 transform -translate-x-1/2" />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white right-[232px]" />
            </>
          )}

          {/* First Masking Reveal (Expands 232px from right) */}
          {showMask && (
            <motion.div
              ref={rightMaskRef}
              initial={{ width: "0px" }}
              animate={{ width: "232px" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 right-0 bg-[#FFFAF3]"
            />
          )}

          {/* Second Masking Reveal (Expands to Center) */}
          {showMask && (
            <motion.div
              ref={secondMaskRef}
              initial={{ width: "0px" }}
              animate={{ width: "calc(50vw - 232px)" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 right-[232px] bg-[#FFFAF3]"
            />
          )}

          {/* Third Masking Reveal (Expands after Second) */}
          {showMask && (
            <motion.div
              ref={thirdMaskRef}
              initial={{ width: "0px" }}
              animate={{ width: "calc(50vw - 232px)" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 right-[calc(50vw)] bg-[#FFFAF3]"
            />
          )}

          {/* Fourth Masking Reveal (Expands to Leftmost Line) */}
          {showMask && (
            <motion.div
              ref={fourthMaskRef}
              initial={{ width: "0px" }}
              animate={{ width: "calc(100vw - (68vw + 232px))" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 right-[calc(50vw - 232px)] bg-[#FFFAF3]"
            />
          )}

          {/* OLIGARCH Text (Starts Instantly with Masking Animations) */}
          {showMask && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }} // Starts immediately
              className="absolute text-black font-normal text-[143.59px] leading-[100%] tracking-[0%] inset-0 flex items-center justify-center"
            >
              OLIGARCH
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
