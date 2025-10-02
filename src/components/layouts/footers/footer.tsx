import { footerData } from "@/constants";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 text-center md:text-left md:grid-cols-4 gap-6">
        {footerData.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold text-lg mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
