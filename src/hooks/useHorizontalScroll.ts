import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Item {
  bgColor: string;
}

const useHorizontalScroll = (items: Item[], setBgColor: (color: string) => void) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const itemsList = section.querySelectorAll<HTMLDivElement>(".item");

    itemsList.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, { xPercent: 90 });
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${itemsList.length * 100}%`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progressIndex = Math.round(self.progress * (items.length - 1));
          setBgColor(items[progressIndex]?.bgColor || "#FFAE63");
        },
      },
      defaults: { ease: "none" },
    });

    itemsList.forEach((item, index) => {
      timeline.to(item, {
        scale: 0.9,
        borderRadius: "10px",
      });

      if (index < itemsList.length - 1) {
        timeline.to(itemsList[index + 1], { xPercent: 0 }, "<");
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [items, setBgColor]);

  return sectionRef;
};

export default useHorizontalScroll;
