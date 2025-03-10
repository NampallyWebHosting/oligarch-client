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
    // Force a repaint on Android to fix layout shift
    requestAnimationFrame(() => {
      document.body.style.display = "none";
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = "";
    });

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

      // Slight delay before GSAP animation starts
      setTimeout(() => {
        gsap.to(curtainRef.current, {
          x: 0,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            setShowLines(true);

            if (isMobile) {
              setTimeout(() => {
                setShowMask(true);

                gsap.to(upperPartRef.current, {
                  yPercent: -100, // Use yPercent instead of y
                  duration: 1.2,
                  ease: "power2.inOut",
                });

                gsap.to(lowerPartRef.current, {
                  yPercent: 100, // Use yPercent instead of y
                  duration: 1.2,
                  ease: "power2.inOut",
                });
              }, 500);
            } else {
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
      }, 200); // Delayed animation start
    }, 3000);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <div className="relative h-screen w-screen bg-[#FFFAF3] flex items-center justify-center overflow-hidden">
      {/* Logo wrapped with Framer Motion to avoid GSAP interference */}
      <motion.img
        src={logo}
        alt="Logo"
        className="w-[500px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />

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
              <div className="absolute top-0 bottom-0 w-[2px] bg-white left-[232px]" />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white left-1/2 transform -translate-x-1/2" />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white right-[232px]" />
            </>
          )}

          {/* Mobile Animation - Single Horizontal Line */}
          {isMobile && showLines && (
            <div className="absolute left-0 right-0 h-[2px] bg-white top-1/2 transform -translate-y-1/2" />
          )}

          {/* Masking Animations */}
          {!isMobile && showMask && (
            <>
              <motion.div ref={rightMaskRef} className="absolute top-0 bottom-0 right-0 bg-[#FFFAF3]" />
              <motion.div ref={secondMaskRef} className="absolute top-0 bottom-0 right-[232px] bg-[#FFFAF3]" />
              <motion.div ref={thirdMaskRef} className="absolute top-0 bottom-0 right-[calc(50vw)] bg-[#FFFAF3]" />
              <motion.div ref={fourthMaskRef} className="absolute top-0 bottom-0 bg-[#FFFAF3]" />
            </>
          )}

          {/* Mobile Animation - Split Screen Movement */}
          {isMobile && showMask && (
            <div className="relative w-full h-screen bg-[#FFFAF3] flex justify-center items-center overflow-hidden">
              <motion.div ref={upperPartRef} className="absolute top-0 left-0 w-full h-1/2 bg-black" />
              <motion.div ref={lowerPartRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-black" />
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
