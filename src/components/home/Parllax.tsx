import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import logo from "@/assets/LionLogo.svg";

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showCurtain, setShowCurtain] = useState(false);
  const [showLines, setShowLines] = useState(false);
  const [showMask, setShowMask] = useState(false);

  const curtainRef = useRef(null);
  const rightMaskRef = useRef(null);
  const secondMaskRef = useRef(null);
  const thirdMaskRef = useRef(null);
  const fourthMaskRef = useRef(null);
  const upperPartRef = useRef(null);
  const lowerPartRef = useRef(null);

  // ✅ Optimize Resize Handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Function to Handle Animations
  const startAnimation = () => {
    setShowCurtain(true);

    const timeline = gsap.timeline({ defaults: { duration: 1.2, ease: "power2.inOut" } });

    // Animate the curtain, then show lines only when it fully reaches the left
    timeline.to(curtainRef.current, {
      x: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => setShowLines(true), // ✅ Show lines only after curtain is fully revealed
    });

    if (isMobile) {
      timeline.add(() => setShowMask(true), "+=0.5");
      timeline.to(upperPartRef.current, { y: "-100%" });
      timeline.to(lowerPartRef.current, { y: "100%" }, "<");
    } else {
      timeline.add(() => setShowMask(true), "+=0.9");
      timeline.to(rightMaskRef.current, { width: "232px" });
      timeline.to(secondMaskRef.current, { width: "calc(50vw - 232px)" });
      timeline.to(thirdMaskRef.current, { width: "calc(50vw - 232px)" });
      timeline.to(fourthMaskRef.current, { left: "0px", width: "232px" });
    }
  };


  useEffect(() => {
    const timer = setTimeout(startAnimation, 3000);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf([
        curtainRef.current,
        upperPartRef.current,
        lowerPartRef.current,
        rightMaskRef.current,
        secondMaskRef.current,
        thirdMaskRef.current,
        fourthMaskRef.current,
      ]);
    };
  }, [isMobile]);

  return (
    <div className="relative w-full min-h-screen bg-[#FFFAF3] flex items-center justify-center overflow-hidden">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-[300px] md:w-[500px]" loading="lazy" />

      {/* Black Curtain */}
      {showCurtain && (
        <motion.div ref={curtainRef} initial={{ x: "100%" }} animate={{ x: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-full bg-black">
          {/* Desktop Lines */}
          {!isMobile && showLines && (
            <>
              <div className="absolute top-0 bottom-0 w-[2px] bg-white left-[232px]" />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white left-1/2 transform -translate-x-1/2" />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white right-[232px]" />
            </>
          )}

          {/* Mobile Line */}
          {isMobile && showLines && <div className="absolute left-0 right-0 h-[2px] bg-white top-1/2 transform -translate-y-1/2" />}

          {/* Masking Animations */}
          {!isMobile && showMask && (
            <>
              <motion.div ref={rightMaskRef} initial={{ width: "0px" }} animate={{ width: "232px" }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute top-0 bottom-0 right-0 bg-[#FFFAF3]" />
              <motion.div ref={secondMaskRef} initial={{ width: "0px" }} animate={{ width: "calc(50vw - 232px)" }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute top-0 bottom-0 right-[232px] bg-[#FFFAF3]" />
              <motion.div ref={thirdMaskRef} initial={{ width: "0px" }} animate={{ width: "calc(50vw - 232px)" }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute top-0 bottom-0 right-[calc(50vw)] bg-[#FFFAF3]" />
              <motion.div ref={fourthMaskRef} initial={{ width: "0px", left: "232px" }} animate={{ width: "232px", left: "0px" }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute top-0 bottom-0 bg-[#FFFAF3]" />
            </>
          )}

          {/* Mobile Animation - Split Screen Movement */}
          {isMobile && showMask && (
            <div className="relative w-full h-screen bg-gray-500 flex justify-center items-center overflow-hidden">
              <motion.div initial={{ y: "0%" }} animate={{ y: "-100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-1/2 bg-black">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
              </motion.div>

              <motion.div initial={{ y: "0%" }} animate={{ y: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute bottom-0 left-0 w-full h-1/2 bg-black">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white"></div>
              </motion.div>
            </div>
          )}

          {/* OLIGARCH Text */}
          {showMask && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className={`absolute text-black font-normal leading-[100%] tracking-[0%] inset-0 flex items-center justify-center font-sedan ${isMobile ? "text-[54px]" : "text-[143.59px]"}`}>
              OLIGARCH
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
