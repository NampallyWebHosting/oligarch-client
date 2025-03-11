import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import logo from "@/assets/LionLogo.svg";

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const [showLines, setShowLines] = useState(false);
  const [showMask, setShowMask] = useState(false);

  const curtainRef = useRef<HTMLDivElement>(null);
  const rightMaskRef = useRef<HTMLDivElement>(null);
  const secondMaskRef = useRef<HTMLDivElement>(null);
  const thirdMaskRef = useRef<HTMLDivElement>(null);
  const fourthMaskRef = useRef<HTMLDivElement>(null);

  const upperPartRef = useRef<HTMLDivElement>(null);
  const lowerPartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCurtain(true);

      // Animate the black screen sliding in
      gsap.to(curtainRef.current, {
        x: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          setShowLines(true);

          if (isMobile) {
            // Mobile Animation: Split screen movement
            setTimeout(() => {
              setShowMask(true);

              gsap.to(upperPartRef.current, {
                y: "-100%",
                duration: 1.2,
                ease: "power2.inOut",
              });

              gsap.to(lowerPartRef.current, {
                y: "100%",
                duration: 1.2,
                ease: "power2.inOut",
              });
            }, 500);
          } else {
            // Desktop Animation: Masking sequence
            setTimeout(() => {
              setShowMask(true);

              gsap.to(rightMaskRef.current, {
                width: "232px",
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.to(secondMaskRef.current, {
                    width: `calc(50vw - 232px)`,
                    duration: 1.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                      gsap.to(thirdMaskRef.current, {
                        width: `calc(50vw - 232px)`,
                        duration: 1.2,
                        ease: "power2.inOut",
                        onComplete: () => {
                          gsap.to(fourthMaskRef.current, {
                            left: "0px",
                            width: "232px",
                            duration: 1.2,
                            ease: "power2.inOut",
                          });
                        },
                      });
                    },
                  });
                },
              });
            }, 900);
          }
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <div className="relative h-screen w-screen bg-[#FFFAF3] flex items-center justify-center overflow-hidden">
      {/* Logo */}
      <img src={logo} alt="Logo" className=" w-64 md:w-[500px]" />
      {/* Black Curtain */}
      {showCurtain && (
        <motion.div
          ref={curtainRef}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-black"
        >
          {/* Desktop Animation - Vertical Lines & Masking */}
          {!isMobile && showLines && (
            <>
              <div className="absolute top-0 bottom-0 left-[232px] w-[3px] bg-white scale-x-[1.05] transform-gpu will-change-transform" />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-white scale-x-[1.05] transform-gpu will-change-transform" />
              <div className="absolute top-0 bottom-0 right-[232px] w-[3px] bg-white scale-x-[1.05] transform-gpu will-change-transform" />
            </>
          )}

          {/* Mobile Animation - Single Horizontal Line */}
          {isMobile && showLines && (
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-white scale-y-[1.05] transform-gpu will-change-transform" />
          )}

          {/* Masking Animations */}
          {!isMobile && showMask && (
            <>
              {/* First Masking Reveal */}
              <motion.div
                ref={rightMaskRef}
                initial={{ width: "0px" }}
                animate={{ width: "232px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 right-0 bg-[#FFFAF3]"
              />
              {/* Second Masking Reveal */}
              <motion.div
                ref={secondMaskRef}
                initial={{ width: "0px" }}
                animate={{ width: "calc(50vw - 232px)" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 right-[232px] bg-[#FFFAF3]"
              />
              {/* Third Masking Reveal */}
              <motion.div
                ref={thirdMaskRef}
                initial={{ width: "0px" }}
                animate={{ width: "calc(50vw - 232px)" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 right-[calc(50vw)] bg-[#FFFAF3]"
              />
              {/* Fourth Masking Reveal */}
              <motion.div
                ref={fourthMaskRef}
                initial={{ width: "0px", left: "232px" }}
                animate={{ width: "232px", left: "0px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 bg-[#FFFAF3]"
              />
            </>
          )}

          {/* Mobile Animation - Split Screen Movement */}
          {isMobile && showMask && (
            <div className="relative w-full h-screen bg-[#FFFAF3] flex justify-center items-center overflow-hidden">
              <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "-100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-black"
              >
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white scale-y-[1.05] transform-gpu will-change-transform"></div>
              </motion.div>

              <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-full h-1/2 bg-black"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-white scale-y-[1.05] transform-gpu will-change-transform"></div>
              </motion.div>
            </div>
          )}
          {/* OLIGARCH Text */}
          {showMask && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`absolute text-black font-normal leading-[100%] tracking-[0%] inset-0 flex items-center justify-center font-sedan ${isMobile ? "text-[54px]" : "text-[143.59px]"
                }`}
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