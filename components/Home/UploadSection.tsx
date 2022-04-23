import React, { useRef, ChangeEvent } from "react";
import { NextPage } from "next/types";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addAudio,
  EFileType,
  selectRecordingStatus,
} from "../../redux/slices/audioSlice";

const UploadSection: NextPage = () => {
  const isRecording = useAppSelector(selectRecordingStatus);
  const dipatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.currentTarget.files ? e.currentTarget.files["0"] : null;
    if (file) {
      dipatch(
        addAudio({
          name: file.name,
          size: file.size,
          blob: URL.createObjectURL(file),
          type: EFileType.UPLOAD,
        })
      );
    }
  };

  return (
    <React.Fragment>
      <motion.div
        animate={{
          height: !isRecording ? "auto" : 0,
          marginBottom: !isRecording ? 32 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
      >
        <input
          ref={inputRef}
          onChange={handleFileUpload}
          type="file"
          className="hidden"
          name="audio"
          accept="audio/*"
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="text-white text-sm font-mono px-4 py-2 rounded-md bg-[#1d1d1d] hover:bg-[#2a2929]"
        >
          Upload an Audio file
        </button>
      </motion.div>
      <motion.div
        animate={{
          height: !isRecording ? 2 : 0,
          marginBottom: !isRecording ? 32 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="bg-[#1d1d1d] w-2/4"
      ></motion.div>
    </React.Fragment>
  );
};

export default UploadSection;
