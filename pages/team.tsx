import type { NextPage } from "next";
import { IMeta } from "../shared/interfaces";
import LayoutWrapper from "../components/LayoutWrapper";

const Team: NextPage = () => {
  const meta: IMeta = {
    title: "Team",
    description: "About the team members",
  };

  return (
    <LayoutWrapper meta={meta}>
      <label className="font-mono text-xl text-black">Under developement</label>
    </LayoutWrapper>
  );
};

export default Team;
