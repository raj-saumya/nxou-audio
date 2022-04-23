import type { NextPage } from "next";
import HeaderNavBar from "./HeaderNavBar";
import HeaderNavBarMob from "./HeaderNavBarMob";

const navItems = [{ title: "Home", path: "/" }];

const Header: NextPage = () => {
  return (
    <div className="flex flex-row px-4 py-10 justify-between items-center">
      <label className="font-mono text-white">NXOU</label>
      <HeaderNavBar navItems={navItems} />
      <HeaderNavBarMob navItems={navItems} />
    </div>
  );
};

export default Header;
