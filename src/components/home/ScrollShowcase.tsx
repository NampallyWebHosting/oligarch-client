import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

// Importing assets
import JammeLogo from "@/assets/Frame 10.svg";
import CocconSalonLogo from "@/assets/1 1.svg";
import ViapniLogo from "@/assets/Frame 10 (1).svg";
import MahadevLogo from "@/assets/Untitled-2-02.svg";
import EmirateaLogo from "@/assets/Frame 10 (3).svg";

gsap.registerPlugin(ScrollTrigger);

// Defining the structure of an item
interface Item {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  bgColor: string;
}

// Props for the ScrollSection component
interface ScrollSectionProps {
  items: Item[];
}

// Main component that renders the scrolling sections
const ScrollSections: React.FC = () => {
  return (
    <main className="w-full">
      <ScrollSection
        items={[
          {
            number: "1",
            title: "Jamme",
            description:
              "Explore the untouched beauty of forests, mountains, and rivers as we uncover the hidden secrets of nature's most breathtaking landscapes.",
            imageSrc: JammeLogo,
            bgColor: "#FFAE63",
          },
          {
            number: "2",
            title: "Coccon",
            description:
              "Immerse yourself in the soothing sounds of chirping birds, rustling leaves, and flowing streams – nature's music for peace and tranquility.",
            imageSrc: CocconSalonLogo,
            bgColor: "#444444",
          },
          {
            number: "3",
            title: "Vipani",
            description:
              "Discover stunning views of majestic mountains, endless oceans, and golden sunsets that remind us of nature's artistic brilliance.",
            imageSrc: ViapniLogo,
            bgColor: "#FFC2D9",
          },
          {
            number: "4",
            title: "Mahadev",
            description:
              "Experience the divine serenity of spiritual landscapes, ancient temples, and the powerful energy of sacred places.",
            imageSrc: MahadevLogo,
            bgColor: "#FFFAF3",
          },
          {
            number: "5",
            title: "Emiratea",
            description:
              "Dive into the incredible forces of nature – from roaring waterfalls to mighty hurricanes – and see how they sculpt the earth we live on.",
            imageSrc: EmirateaLogo,
            bgColor: "#CEB2B5",
          },
        ]}
      />
    </main>
  );
};

// Component that implements the scrolling effect
const ScrollSection: React.FC<ScrollSectionProps> = ({ items }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState(items[0].bgColor);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const itemsList = section.querySelectorAll<HTMLDivElement>(".item");

    // Set initial positions for animation
    itemsList.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, { xPercent: 90 }); // 90% offscreen, only 10% visible
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

    // Animate each section as the user scrolls
    itemsList.forEach((item, index) => {
      timeline.to(item, {
        scale: 0.9,
        borderRadius: "10px",
      });

      if (index < itemsList.length - 1) {
        timeline.to(itemsList[index + 1], { xPercent: 0 }, "<"); // Bring next card fully into view
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [items]);

  return (
    <div
      ref={sectionRef}
      className="scroll-section horizontal-section overflow-hidden font-montserrat"
      style={{ backgroundColor: bgColor, transition: "background-color 0.5s ease-in-out" }}
    >
      <div className="h-screen">
        <div role="list" className="flex h-[600px] relative p-1 mt-20">
          {items.map((item, index) => (
            <div
              key={index}
              role="listitem"
              className="item w-screen h-full absolute inset-0 flex shadow-none overflow-hidden lg:px-60"
            >
              {/* Left: Image Section */}
              <img
                src={item.imageSrc}
                alt={item.title}
                className="object-cover w-1/2 h-full rounded-r-none rounded-xl"
              />

              {/* Right: Text Section */}
              <div className="bg-white flex flex-col justify-center p-12 relative w-1/2 rounded-xl rounded-l-none">
                <h2 className="text-3xl leading-[100%] font-semibold">{item.title}</h2>
                <p className="text-base font-medium mt-2">{item.description}</p>
                <div className="flex justify-end text-[#6F2330] font-semibold mt-2 cursor-pointer animate-bounce">
                  visit now <ArrowUpRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSections;
