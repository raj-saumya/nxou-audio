import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IAudioState {
  isRecording: boolean;
  recordingStatus: string;
  audioFiles: IAudioFile[];
}

export enum EFileType {
  UPLOAD = "uploadedMedia",
  RECORDED = "recordedAudio",
}

export interface IAudioFile {
  name: string;
  size: string;
  blob: string;
  type: EFileType;
}

export interface IAudioFilePayload {
  name?: string;
  size: number;
  blob: string;
  type: EFileType;
}

const initialState: IAudioState = {
  isRecording: false,
  audioFiles: [],
  recordingStatus: "",
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    toggleRecording: (state) => {
      if (state.isRecording) {
        state.recordingStatus = "STOP";
      } else {
        state.recordingStatus = "PLAYING";
      }
      state.isRecording = !state.isRecording;
    },
    addAudio: (state, action: PayloadAction<IAudioFilePayload>) => {
      const { name, blob, size, type } = action.payload;
      state.audioFiles.push({
        name: name
          ? name
          : `Recorded Audio - ${
              state.audioFiles.filter((_) => _.type === EFileType.RECORDED)
                .length + 1
            }`,
        size: covertBytes(size),
        blob,
        type,
      });
    },
  },
});

const covertBytes = (bytes: number): string => {
  const units = ["bytes", "KB", "MB", "GB"];
  let l = 0;

  while (bytes >= 1024 && ++l) {
    bytes = bytes / 1024;
  }

  return bytes.toFixed(bytes < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

export const { toggleRecording, addAudio } = audioSlice.actions;

export const selectRecordingStatus = (state: RootState) =>
  state.audio.isRecording;

export const selectRecordingString = (state: RootState) =>
  state.audio.recordingStatus;

export const selectAudioFiles = (state: RootState) => state.audio.audioFiles;

export default audioSlice.reducer;
