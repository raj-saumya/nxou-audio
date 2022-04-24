import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next/types";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  toggleRecording,
  selectRecordingStatus,
  selectRecordingString,
  addAudio,
  EFileType,
} from "../../redux/slices/audioSlice";
import AudioRecorder from "../../shared/audioAPI";

const convertToDigitalFormat = (seconds: number): string => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(14, 19);
};

const RecordSection: NextPage = () => {
  const isRecording = useAppSelector(selectRecordingStatus);
  const recordingStatus = useAppSelector(selectRecordingString);
  const dispatch = useAppDispatch();
  const audioRecorderRef = useRef(new AudioRecorder());
  const [time, setTime] = useState(0);

  useEffect(() => {
    switch (recordingStatus) {
      case "PLAYING":
        audioRecorderRef.current
          .start()
          .then(() => {})
          .catch((err) => {
            console.log("err", err);
          });
        break;
      case "STOP":
        audioRecorderRef.current
          .stop()
          .then((audioBlob) => {
            dispatch(
              addAudio({
                size: audioBlob.size,
                blob: URL.createObjectURL(audioBlob),
                type: EFileType.RECORDED,
              })
            );
          })
          .catch((err) => {
            console.log("err", err);
          });
      default:
        break;
    }
  }, [recordingStatus]);

  useEffect(() => {
    let interval: any;

    if (recordingStatus === "PLAYING") {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (recordingStatus === "STOP") {
      clearInterval(interval);
      setTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [recordingStatus]);

  const handleMicClick = () => {
    dispatch(toggleRecording());
  };

  if (!isRecording) {
    return (
      <div
        className="flex items-center justify-center cursor-pointer bg-sky-800 hover:bg-sky-900 rounded-full w-12 h-12 p-3 shadow-lg overflow-hidden"
        onClick={handleMicClick}
      >
        <Image
          src="/images/icon-mic.svg"
          width={32}
          height={32}
          objectFit="fill"
          alt="icon-mic"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center ml-1">
      <div className="animate-pulse mr-4">
        <div className="rounded-full bg-red-600 w-5 h-5"></div>
      </div>
      <label className="text-black font-mono font-bold text-2xl mr-4">
        {convertToDigitalFormat(time)}
      </label>
      <div
        className="flex items-center justify-center rounded-full border-2 border-red-700 h-6 w-6"
        onClick={handleMicClick}
      >
        <div className="w-2 h-2 bg-red-700"></div>
      </div>
    </div>
  );
};

export default RecordSection;
