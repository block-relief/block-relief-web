import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white px-12 py-[72px] h-auto sm:h-[278px]">
      <div className="container p-2.5 h-auto sm:h-[134px] flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-[32px] font-semibold font-alata">DERA</h1>
          <p className="mt-1">&copy; 2025 | All Rights Reserved.</p>
        </div>
        <div className="text-right flex flex-col items-center space-x-4 gap-8">
          <div className="flex items-center justify-start gap-4">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                width={36}
                height={36}
              />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                alt="Instagram"
                width={36}
                height={36}
              />
            </Link>
            <Link
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                alt="GitHub"
                width={36}
                height={36}
              />
            </Link>
          </div>
          <div className="flex items-center justify-start">
            <Mail />
            <a href="mailto:Dera@info.com" className="ml-4">
              Dera@info.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
