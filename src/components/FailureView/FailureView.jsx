import React from "react";
import "../LoadingView/LoadingView.scss";

export default function FailureView(props) {
  return (
    <div className='failureView text-center d-none mt-5 text-light'>
      <h2 className='failureMsg'> </h2>
      <span role='img' aria-label='weary face' className='emoji d-block'>
        😩
      </span>
      <span className='d-block'>Cannot find song match</span>
      <button
        className='btn btn-danger shadow-nome text-center mt-3'
        onClick={() => {
          props.changeText(
            "Press & hold the record button between 5 and 10 seconds for optimal results"
          );
          document.querySelector(".mainText").classList.remove("fade");
          props.showLoadingView();
          document.querySelector(".results").classList.add("d-none");
          document.querySelector(".failureView").classList.add("d-none");
          document.getElementById("audioPlayer").pause();
        }}
      >
        Try Again
      </button>
    </div>
  );
}
