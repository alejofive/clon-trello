"use client";

import Image from "next/image";
import Avatar from "react-avatar";

function Header() {
  return (
    <header className="w-full h-full overflow-x-hidden overflow-hidden">
      <div className="flex flex-col  md:flex-row items-center p-5 w-full">
        <div className="flex items-center justify-center">
          <Image
            src="/img/logo.png"
            alt="Trello Logo"
            width={400}
            height={100}
            className="md:w-80 w-60 object-contain"
          />
        </div>
        <div className="flex items-center space-x-5 flex-1 justify-end w-full mt-4 md:mt-0">
          {/* Avatar */}
          <Avatar name="Alejo Garcia" round size="50" />
        </div>
      </div>
    </header>
  );
}

export default Header;
