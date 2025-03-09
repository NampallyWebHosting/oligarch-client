import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
// Importing assets
import JammeLogo from "@/assets/Frame 45.svg";
import CocconSalonLogo from "@/assets/1 1.svg";
import ViapniLogo from "@/assets/Frame 10 (1).svg";
import MahadevLogo from "@/assets/Group 55.svg";
import EmirateaLogo from "@/assets/Frame 10 (3).svg";

gsap.registerPlugin(ScrollTrigger);

// Defining the structure of an item
interface Item {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  bgColor: string;
  url: string;
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
              "Jamme is an audio-first social app for sharing 1-minute voice messages  –  no cameras, no keyboards. It’s a space for creatives, students, artists, workers, and everyday people to connect through authentic storytelling.",
            imageSrc: JammeLogo,
            bgColor: "#FFAE63",
            url: "https://jamme.app",
          },
          {
            number: "2",
            title: "Cocoon",
            description:
              "Step into Cocoon, India's bespoke boutique salon nestled in Hyderabad. This chic haven offers expert haircuts, luxe treatments, and bespoke beauty services. nail-art all in a serene, stylish setting. Get pampered!",
            imageSrc: CocconSalonLogo,
            bgColor: "#444444",
            url: "https://cocoon.salon",
          },
          {
            number: "3",
            title: "Vipani",
            description:
              "Operate Fearlessly. Command your business with Vipani – the ultimate AI Super-app to unify and streamline all your business functions in one seamless interface.",
            imageSrc: ViapniLogo,
            bgColor: "#FFC2D9",
            url: "https://vipani.co",
          },
          {
            number: "4",
            title: "Mahadev",
            description:
              "Mahdev offers bespoke software development, design, cybersecurity, and AI solutions to boost your brand. Contact us today.",
            imageSrc: MahadevLogo,
            bgColor: "#FFFAF3",
            url: "https://example.com/mahadev",
          },
          {
            number: "5",
            title: "Emiratea",
            description:
              "Emiratea brings Hyderabad’s Irani chai and Osmania biscuits to the Emirates. Our chai should be a household name, representing the best tea. We maintain our authentic tradition.",
            imageSrc: EmirateaLogo,
            bgColor: "#CEB2B5",
            url: "#",
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
        <div role="list" className="flex h-[550px] md:h-[800px] lg:h-[600px] relative p-1 mt-20">
          {items.map((item, index) => (
            <div
              key={index}
              role="listitem"
              className="item w-screen h-full absolute inset-0 flex flex-col lg:flex-row shadow-none overflow-hidden px-6 md:px-40 lg:px-60"
            >
              {/* Left: Image Section */}
              <img
                src={item.imageSrc}
                alt={item.title}
                className="object-cover max-w-md lg:max-w-xl rounded-xl rounded-b-none lg:rounded-b-3x lg:rounded-3xl lg:rounded-r-none"
              />
              {/* Right: Text Section */}
              <div className="bg-white flex flex-col justify-center p-6 md:p-12 relative  w-full md:max-w-md lg:w-1/2 h-full lg:rounded-3xl lg:rounded-l-none  rounded-xl rounded-t-none lg:rounded-t-3">
                <h2 className="text-2xl md:text-3xl leading-[100%] font-semibold ml-3">{item.title}</h2>
                <p className="text-sm md:text-base font-medium mt-2 px-4 ">{item.description}</p>
                {item.title === "Emiratea" ? (
                  <span className="flex justify-end text-[#6F2330] font-semibold mt-4 md:mt-4">Coming Soon</span>
                ) : (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex justify-end text-[#6F2330] font-semibold mt-4 md:mt-4 cursor-pointer animate-bounce text-sm lg:text-base">
                    Visit Now <ArrowUpRight />
                  </a>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSections;
