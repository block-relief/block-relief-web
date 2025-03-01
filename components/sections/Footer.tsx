import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white px-12 py-[72px] h-auto sm:h-[278px]">
      <div className="container p-2.5 h-auto sm:h-[134px] flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-2xl">DERA</h1>
          <p className="mt-1">&copy; 2025 | All Rights Reserved.</p>
        </div>
        <div className="text-right flex items-center space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
              alt="GitHub"
              width={20}
              height={20}
            />
          </a>
          <a href="mailto:Dera@info.com" className="ml-4">
            Dera@info.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
