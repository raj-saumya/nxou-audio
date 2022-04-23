import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

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
    className={`cursor-pointer font-mono text-sm mx-2 hover:text-white px-4 py-1 rounded ${
      isSamePath(path, asPath) ? "text-white bg-[#4c4c4c]" : "text-[#c1c1c1]"
    }`}
  >
    {title}
  </label>
);

interface IHeaderLink {
  title: string;
  path: string;
}

const HeaderLink: NextPage<IHeaderLink> = ({ title, path }) => {
  const { asPath } = useRouter();

  if (isSamePath(path, asPath)) {
    return <></>;
  }

  return (
    <Link href={path}>
      <a>
        <AnchorLabel title={title} path={path} asPath={asPath} />
      </a>
    </Link>
  );
};

interface IHeaderNavBar {
  navItems: Array<{ title: string; path: string }>;
}

const HeaderNavBar: NextPage<IHeaderNavBar> = ({ navItems }) => {
  return (
    <div className="hidden flex-row items-center sm:flex">
      {navItems.map((d, index) => (
        <HeaderLink key={index} {...d} />
      ))}
    </div>
  );
};

export default HeaderNavBar;
