import type { NextPage } from "next";
import Masonry from "react-masonry-css";
import { IMeta } from "../shared/interfaces";
import LayoutWrapper from "../components/LayoutWrapper";

const ModelInfoCard = () => {
  return (
    <div className="flex flex-col bg-slate-800 rounded-md shadow-lg px-4 py-2 mb-10 mr-10 h-80 overflow-hidden">
      <div className="rounded-md bg-slate-700 px-2 py-2 mt-2 mb-4">
        <label className="text-2xl font-mono text-white">CNN Model</label>
      </div>
      <label className="text-white font-mono text-base mb-2 max-h-48 overflow-hidden">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </label>
    </div>
  );
};

const MASONARY_COL_BREAK_POINTS = {
  default: 5,
  1560: 4,
  1280: 3,
  972: 2,
  656: 1,
};

const AboutModel: NextPage = () => {
  const meta: IMeta = {
    title: "ML Models",
    description: "About the ml model",
  };

  return (
    <LayoutWrapper meta={meta}>
      <div className="flex-1">
        <Masonry
          breakpointCols={MASONARY_COL_BREAK_POINTS}
          className="flex w-auto -ml-8"
          columnClassName="masonary_grid_col pl-8 bg-clip-padding"
        >
          {[1, 2].map((d) => (
            <ModelInfoCard key={d} />
          ))}
        </Masonry>
      </div>
    </LayoutWrapper>
  );
};

export default AboutModel;
