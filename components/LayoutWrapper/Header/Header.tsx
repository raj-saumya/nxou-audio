import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import HeaderNavBar from "./HeaderNavBar";
import HeaderNavBarMob from "./HeaderNavBarMob";

const navItems = [
  { title: "Home", path: "/" },
  { title: "Model", path: "/model" },
  { title: "Team", path: "/team" },
];

const Header: NextPage = () => {
  return (
    <div className="flex flex-row py-10 justify-between items-center sticky top-0 z-20 bg-white">
      <div className="flex items-center">
        <Link href="/" passHref>
          <a className="mr-2">
            <Image
              src="/images/icon-home.svg"
              width={32}
              height={32}
              objectFit="fill"
              alt="icon-home"
            />
          </a>
        </Link>
        <label className="font-mono font-bold text-xl text-[#354136]">
          SLI
        </label>
      </div>
      <HeaderNavBar navItems={navItems} />
      <HeaderNavBarMob navItems={navItems} />
    </div>
  );
};

export default Header;
