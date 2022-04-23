import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next/types";
import Image from "next/image";
import { useAppSelector } from "../../redux/hooks";
import { IAudioFile, selectAudioFiles } from "../../redux/slices/audioSlice";

interface IProps extends IAudioFile {
  isLast: boolean;
}

const Audio: NextPage<IProps> = ({ isLast, name, size, blob }) => {
  const [audioStatus, toggleAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioStatus) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [audioStatus]);

  return (
    <React.Fragment>
      <div className="flex rounded-md w-full px-4 py-2">
        <div className="flex flex-col flex-1 self-start whitespace-nowrap overflow-hidden mr-2">
          <label className="text-white font-mono text-sm mb-0.5 overflow-hidden text-ellipsis">
            {name}
          </label>
          <label className="text-gray-400 font-mono text-xs">{size}</label>
          <audio ref={audioRef} src={blob} className="hidden" />
        </div>
        <div className="flex items-center cursor-pointer">
          <Image
            src={`/images/icon-${audioStatus ? "audio" : "play"}.svg`}
            width={32}
            height={32}
            alt={`icon-${audioStatus ? "audio" : "play"}`}
            onClick={() => toggleAudio(!audioStatus)}
          />
        </div>
      </div>
      {!isLast && (
        <div className="border-b-[1px] border-y-zinc-700 w-full my-1"></div>
      )}
    </React.Fragment>
  );
};

const AudioRecordings: NextPage = () => {
  const audioFiles = useAppSelector(selectAudioFiles);

  return (
    <div className="flex items-center justify-center rounded-md px-4 py-4 bg-gradient-to-b from-zinc-800 to-zinc-900 w-4/5 md:w-3/4">
      {audioFiles.length ? (
        <div className="flex flex-col items-center w-full">
          {audioFiles.map((d, index) => (
            <Audio
              key={d.name}
              isLast={index === audioFiles.length - 1}
              {...d}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col text-center">
          <label className="font-mono text-base text-green-500 mb-2">
            No Audio files found.
          </label>
          <label className="font-mono text-base text-green-500 mb-2">
            Please Upload/Record to continue.
          </label>
        </div>
      )}
    </div>
  );
};

export default AudioRecordings;
