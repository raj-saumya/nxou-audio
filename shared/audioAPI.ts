export default class AudioRecorder {
  private _audioBlob: Blob[] = [];
  private _mediaRecorder!: MediaRecorder;
  private _streamCaptured!: MediaStream;

  constructor() {}

  public start(): Promise<any> {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(
        new Error(
          "mediaDevices API or getUserMedia method is not supported in this browser."
        )
      );
    } else {
      return navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this._streamCaptured = stream;
          this._mediaRecorder = new MediaRecorder(stream);
          this._audioBlob = [];

          this._mediaRecorder.addEventListener("dataavailable", (event) => {
            this._audioBlob.push(event.data);
          });

          this._mediaRecorder.start();
        });
    }
  }

  public stop(): Promise<Blob> {
    return new Promise((resolve) => {
      const mimeType = this._mediaRecorder.mimeType;

      this._mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this._audioBlob, { type: mimeType });
        resolve(audioBlob);
      });

      this.cancel();
    });
  }

  public cancel(): void {
    this._mediaRecorder.stop();
    this._stopStream();
    this._resetRecordingProperties();
  }

  private _stopStream(): void {
    this._streamCaptured.getTracks().forEach((track) => track.stop());
  }

  private _resetRecordingProperties() {
    //@ts-ignore
    this._mediaRecorder = null;
    //@ts-ignore
    this._streamCaptured = null;
  }
}
