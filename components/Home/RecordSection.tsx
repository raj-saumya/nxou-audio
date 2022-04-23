import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next/types";
import Image from "next/image";
import { motion } from "framer-motion";
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

  return (
    <React.Fragment>
      <div
        className="cursor-pointer mb-4 transition-all ease-in-out duration-300"
        onClick={handleMicClick}
      >
        <Image
          src="/images/icon-mic.svg"
          width={64}
          height={64}
          alt="icon-mic"
        />
      </div>
      <motion.div
        initial={{
          height: 0,
        }}
        animate={{
          height: !isRecording ? 0 : "auto",
          marginBottom: !isRecording ? 0 : 32,
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
      >
        <label className="text-white font-mono text-2xl">
          {convertToDigitalFormat(time)}
        </label>
      </motion.div>
    </React.Fragment>
  );
};

export default RecordSection;
