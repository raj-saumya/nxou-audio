import type { NextPage } from "next";
import Image from "next/image";
import { IMeta } from "../shared/interfaces";
import LayoutWrapper from "../components/LayoutWrapper";
import UploadSection from "../components/Home/UploadSection";
import RecordSection from "../components/Home/RecordSection";
import AudioRecordings from "../components/Home/AudioRecordings";

const Home: NextPage = () => {
  const meta: IMeta = {
    title: "SLI",
    description: "Audio Learner",
  };

  return (
    <LayoutWrapper meta={meta}>
      <div className="flex-1 flex flex-col w-full">
        {/* Section A : title  */}
        <div className="flex-1 flex flex-col items-center mb-40 z-10 md:flex-row-reverse">
          <div className="flex-1 flex flex-col self-start md:self-center">
            <label className="text-4xl font-bold font-mono text-black">
              Welcome to,
            </label>
            <label className="text-4xl font-bold font-mono text-black mt-3">
              Spoken Language
            </label>
            <label className="text-4xl font-bold font-mono text-black mt-3">
              Indentification
            </label>
          </div>
        </div>
        {/* Section A : end */}
        {/* Section B : Mic + audio list */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 mb-10">
          <label className="text-xl font-bold font-mono text-black mt-3 self-start mb-8">
            To start either upload an audio file or record the sound.
          </label>
          <div className="flex self-start flex-col sm:flex-row sm:items-center">
            <UploadSection />
            <RecordSection />
          </div>
        </div>
        {/* Section B : end */}
        {/* Section C : Audio file list */}
        <div className="z-10">
          <AudioRecordings />
        </div>
        {/* Section C : end */}
        {/* Section D : background cover */}
        <div className="fixed top-[1/4] left-0 w-screen h-screen z-0 opacity-20">
          <Image
            src="/images/icon-banner.svg"
            alt="icon-banner"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Section D : end */}
      </div>
    </LayoutWrapper>
  );
};

export default Home;
