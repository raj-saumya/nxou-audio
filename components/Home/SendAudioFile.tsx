import { NextPage } from "next/types";
import { useAppSelector } from "../../redux/hooks";
import { selectPlayingAudioFile } from "../../redux/slices/audioSlice";

const SendAudioFile: NextPage = () => {
  const activeAudioFile = useAppSelector(selectPlayingAudioFile);

  const handleSendFile = () => {
    // api logic
  };

  if (!activeAudioFile) {
    return <></>;
  }

  return (
    <div className="flex flex-col self-start whitespace-nowrap overflow-hidden mr-2 bg-sky-700 px-4 py-2 rounded-md">
      <label className="text-white font-mono text-sm mb-0.5 overflow-hidden text-ellipsis">
        {activeAudioFile.name}
      </label>
      <label className="text-gray-300 font-mono text-xs mb-4">
        {activeAudioFile.size}
      </label>
      <label
        className="w-fit self-end cursor-pointer text-white font-mono text-sm bg-zinc-900 px-4 py-2 rounded-md"
        onClick={handleSendFile}
      >
        Send audio file
      </label>
    </div>
  );
};

export default SendAudioFile;
