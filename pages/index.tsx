import type { NextPage } from "next";
import { IMeta } from "../shared/interfaces";
import LayoutWrapper from "../components/LayoutWrapper";
import UploadSection from "../components/Home/UploadSection";
import RecordSection from "../components/Home/RecordSection";
import AudioRecordings from "../components/Home/AudioRecordings";
import SendAudioFile from "../components/Home/SendAudioFile";

const Home: NextPage = () => {
  const meta: IMeta = {
    title: "NXOU",
    description: "Audio Learner",
  };

  return (
    <LayoutWrapper meta={meta}>
      <div className="flex-1 flex flex-col w-full items-center justify-center md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center">
          <UploadSection />
          <RecordSection />
        </div>
        <div className="flex-1 flex w-full items-center justify-center">
          <AudioRecordings />
        </div>
      </div>
      <div className="flex justify-center">
        <SendAudioFile />
      </div>
    </LayoutWrapper>
  );
};

export default Home;
