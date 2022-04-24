import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next/types";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  IAudioFile,
  playAudio,
  selectAudioFiles,
  selectPlayingAudioFile,
} from "../../redux/slices/audioSlice";

interface IProps extends IAudioFile {
  isLast: boolean;
}

const Audio: NextPage<IProps> = ({ isLast, name, size, blob }) => {
  const [audioStatus, toggleAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const activeAudioFile = useAppSelector(selectPlayingAudioFile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (audioStatus) {
      audioRef.current?.play();
      dispatch(playAudio(name));
    } else {
      audioRef.current?.pause();
    }
  }, [audioStatus]);

  useEffect(() => {
    if (activeAudioFile?.name !== name) {
      toggleAudio(false);
    }
  }, [activeAudioFile]);

  const handleAudioUpload = () => {
    console.log("send audio file =>>>");
  };

  return (
    <React.Fragment>
      <div className="flex flex-col rounded-md w-full px-4 py-2">
        <div className="flex mb-4">
          <div className="flex flex-col flex-1 self-start whitespace-nowrap overflow-hidden mr-2">
            <label className="text-black font-mono text-lg mb-0.5 overflow-hidden text-ellipsis">
              {name}
            </label>
            <label className="text-gray-600 font-mono text-sm">{size}</label>
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
        <div className="self-end">
          <button
            className="font-mono text-sm text-white bg-sky-700 hover:bg-sky-800 rounded-md px-3 py-1"
            onClick={handleAudioUpload}
          >
            Analyze Audio
          </button>
        </div>
      </div>
      {!isLast && (
        <div className="border-b-[1px] border-y-blue-300 w-full my-1"></div>
      )}
    </React.Fragment>
  );
};

const AudioRecordings: NextPage = () => {
  const audioFiles = useAppSelector(selectAudioFiles);

  return (
    <div className="flex items-center justify-center rounded-md px-4 py-4 shadow-lg backdrop-blur-sm bg-opacity-20 bg-sky-300 w-full md:w-2/4">
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
          <label className="font-mono text-base text-sky-900 mb-2">
            No Audio files found.
          </label>
          <label className="font-mono text-base text-sky-900 mb-2">
            Please Upload/Record to continue.
          </label>
        </div>
      )}
    </div>
  );
};

export default AudioRecordings;
