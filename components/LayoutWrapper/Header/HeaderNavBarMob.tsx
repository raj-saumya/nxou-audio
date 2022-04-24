import React, { useRef } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const isSamePath = (linkPath: string, currentPath: string) => {
  return linkPath === currentPath;
};

interface IAnchorLabel {
  title: string;
  path: string;
  asPath: string;
}

const AnchorLabel: NextPage<IAnchorLabel> = ({ title, path, asPath }) => (
  <label
    className={`cursor-pointer font-monospace text-base hover:text-white rounded ${
      isSamePath(path, asPath)
        ? "text-white underline underline-offset-8"
        : "text-[#c1c1c1]"
    }`}
  >
    {title}
  </label>
);

interface IHeaderLink {
  title: string;
  path: string;
  handleCloseNavPanel: any;
}

const HeaderLink: NextPage<IHeaderLink> = ({
  handleCloseNavPanel,
  title,
  path,
}) => {
  const { asPath } = useRouter();

  if (!path) {
    return (
      <a className="mx-4 my-4">
        <AnchorLabel title={title} path={path} asPath={asPath} />
      </a>
    );
  }

  return (
    <Link href={path}>
      <a className="mx-4 my-4" onClick={handleCloseNavPanel}>
        <AnchorLabel title={title} path={path} asPath={asPath} />
      </a>
    </Link>
  );
};

interface IHeaderNavBarMob {
  navItems: Array<{ title: string; path: string }>;
}

const HeaderNavBarMob: NextPage<IHeaderNavBarMob> = ({ navItems }) => {
  const ref = useRef<any>(null);

  const handleCloseNavPanel = () =>
    ref.current.classList.toggle("-translate-x-full");

  return (
    <React.Fragment>
      <div className="sm:hidden">
        <Image
          src="/images/icon-nav.svg"
          width={32}
          height={24}
          alt="icon-nav"
          onClick={handleCloseNavPanel}
        />
      </div>
      <div
        ref={ref}
        className="z-20 backdrop-blur-sm bg-[#151717] bg-opacity-60 w-full h-screen fixed left-0 top-0 px-4 py-10 transition -translate-x-full duration-200 ease-in-out sm:hidden"
      >
        <div className="flex flex-col">
          {navItems.map((d, index) => (
            <HeaderLink
              key={index}
              handleCloseNavPanel={handleCloseNavPanel}
              {...d}
            />
          ))}
        </div>
        <div className="fixed top-14 right-10">
          <Image
            src="/images/icon-close.svg"
            width={32}
            height={24}
            alt="icon-close"
            onClick={handleCloseNavPanel}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderNavBarMob;
