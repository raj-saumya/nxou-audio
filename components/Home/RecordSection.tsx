import React, { useEffect, useRef } from "react";
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
  var date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(14, 19);
};

const RecordSection: NextPage = () => {
  const isRecording = useAppSelector(selectRecordingStatus);
  const recordingStatus = useAppSelector(selectRecordingString);
  const dispatch = useAppDispatch();
  const audioRecorderRef = useRef(new AudioRecorder());

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

  const handleMicClick = () => {
    dispatch(toggleRecording());
  };

  return (
    <React.Fragment>
      <div
        className="cursor-pointer mb-4 transition-all ease-in-out duration-300 hover:scale-125"
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
          {convertToDigitalFormat(165)}
        </label>
      </motion.div>
    </React.Fragment>
  );
};

export default RecordSection;
