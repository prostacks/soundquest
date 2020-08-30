import React from "react";
import "./RecordBtn.scss";

const RecordBtn = (props) => {
  const constraints = {
    audio: true,
    video: false,
  };

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    let recorder = new MediaRecorder(stream);
    let chunks = [];
    let recordButton = document.querySelector(".record-btn");

    const record = (e) => {
      recorder.start();
      console.log("recording...");
      e.target.classList.add("pulse");
      props.changeText("Listening for music...");
    };

    const stop = (e) => {
      recorder.stop();
      console.log("recording stopped");
      e.target.classList.remove("pulse");
    };
    const addData = (e) => {
      chunks.push(e.data);
    };

    const SaveData = () => {
      let blob = new Blob(chunks, { type: "audio/mp3" });
      chunks = [];
      props.handleData(blob);
    };

    recordButton.onmousedown = record;
    recordButton.ontouchstart = record;
    recordButton.onmouseup = stop;
    recordButton.ontouchend = stop;
    recorder.ondataavailable = addData;
    recorder.onstop = SaveData;
  });
  return (
    <div className='record-btn text-uppercase bg-danger mx-auto text-light'>
      rec
    </div>
  );
};

export default RecordBtn;
