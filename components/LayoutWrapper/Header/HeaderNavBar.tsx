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
    className={`cursor-pointer font-mono text-base font-bold mx-2 text-slate-800 underline-offset-4 px-4 py-1 rounded ${
      isSamePath(path, asPath) ? "underline" : ""
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
