import React from "react";

import "./RecordBtn.scss";

let chunks = [];

function RecordBtn(props) {
  const record = (e) => {
    if (props.mediaDevices === false) {
      return;
    }
    props.recorder.start();
    console.log("recording...");
    e.target.classList.add("pulse");
    props.changeText(props.recording);
    props.hideModal();
    props.recorder.ondataavailable = addData;
  };

  const stopRecording = (e) => {
    if (props.mediaDevices === false) {
      return;
    }
    props.recorder.stop();
    console.log("recording stopped");
    e.target.classList.remove("pulse");
    props.recorder.onstop = SaveData;
  };

  const addData = (e) => {
    chunks.push(e.data);
  };

  const SaveData = () => {
    let blob = new Blob(chunks, { type: "audio/mp3" });
    chunks = [];
    props.handleData(blob);
  };

  return (
    <div
      className='record-btn text-uppercase bg-danger mx-auto text-light'
      onMouseDown={record}
      onMouseUp={stopRecording}
      onTouchStart={record}
      onTouchEnd={stopRecording}
    >
      rec
    </div>
  );
}

export default RecordBtn;
