import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button"; // ShadCN Button Component
import OLIGARCH_LOGO from "../../assets/Group 22.svg";
const Footer: React.FC = () => {
    return (
        <footer className=" absolute bg-[#1C1F26] text-white w-full min-h-screen flex flex-col px-4 py-10 overflow-hidden">
            <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start relative z-10 px-6 md:px-2 lg:px-20">
                {/* Left Section - Logo & Tagline */}
                <div className="text-center md:text-left flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2">
                        <img src={OLIGARCH_LOGO} alt="Oligarch Holdings Logo" className="w-12 md:w-28 lg:w-full" />
                        <div>
                            <p className="font-[Sedan] font-normal text-[32px] lg:text-[40px] leading-[38px] lg::leading-[48px]">
                                OLIGARCH
                            </p>
                            <p className="font-[Sedan] font-normal text-[20px] md:text-[24px] leading-[26px] md:leading-[28.8px]">
                                HOLDINGS
                            </p>
                        </div>
                    </div>
                    <p className="mt-4 md:mt-6 max-w-sm text-[#8F9FA3] text-sm md:text-base font-medium">
                        Empowering innovation, transforming industries.
                    </p>
                </div>
                {/* Right Section - Contact & Location */}
                <div className="mt-8 md:mt-0 flex flex-col md:flex-row gap-6 lg:gap-12 text-center md:text-left">
                    {/* Contact Us */}
                    <div>
                        <label className="text-lg md:text-xl font-medium text-[#FFFAF3]">Contact us</label>
                        <div className="font-semibold flex flex-col items-center md:items-start gap-1 md:gap-2 text-gray-300 mt-2">
                            <p className="text-sm font-normal text-[#8F9FA3]">+1 (302) 312-8404</p>
                            <p className="text-sm font-normal text-[#8F9FA3]">
                                hello@oligarch.holdings
                            </p>
                        </div>
                    </div>
                    {/* Location */}
                    <div>
                        <label className="text-lg md:text-xl font-medium text-[#FFFAF3]">Location</label>
                        <div className="font-semibold flex flex-col items-center md:items-start gap-1 md:gap-2 text-gray-300 mt-2">
                            <p className="text-sm font-normal text-[#8F9FA3]">318 Clydia Ct, Middletown,</p>
                            <p className="text-sm font-normal text-[#8F9FA3]">
                                DE 19709, USA
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="flex  flex-col md:flex-row lg:flex-start md:ml-12  mt-36 md:gap-4">
                <div className="flex gap-4">
                    <Button variant="ghost" className="bg-[#FFFAF3] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:opacity-80 transition">
                        <Facebook size={20} className="text-[#1C1F26]" />
                    </Button>
                    <Button variant="ghost" className="bg-[#FFFAF3] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:opacity-80 transition">
                        <Twitter size={20} className="text-[#1C1F26]" />
                    </Button>
                    <Button variant="ghost" className="bg-[#FFFAF3] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:opacity-80 transition">
                        <Linkedin size={20} className="text-[#1C1F26]" />
                    </Button>
                    <Button variant="ghost" className="bg-[#FFFAF3] rounded-full p-3 w-12 h-12 flex items-center justify-center hover:opacity-80 transition">
                        <Instagram size={20} className="text-[#1C1F26]" />
                    </Button>
                </div>
                <div className="text-center text-gray-500 text-xs md:text-sm mt-6">
                    © 2025 Oligarch Holdings. All rights reserved.
                </div>
            </div>

            {/* Large Background Text */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden flex justify-center">
                <h1
                    className="text-[17vw] md:text-[18vw] lg:text-[18vw] font-serif text-[#F5EADB] leading-none whitespace-nowrap"
                    aria-hidden="true"
                >
                    OLIGARCH
                </h1>
            </div>
        </footer>
    );
};

export default Footer;
