import React, { useRef, ChangeEvent } from "react";
import { NextPage } from "next/types";
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
    <div className="mb-8 mr-10 sm:mb-0">
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
        className="text-white text-lg font-mono px-6 py-2 rounded-md shadow-lg bg-sky-600  disabled:bg-slate-300 hover:bg-sky-700"
        disabled={isRecording}
      >
        Upload an Audio file
      </button>
    </div>
  );
};

export default UploadSection;
