import React from "react";
import "./modal.scss";
import { withRouter } from "react-router-dom";

const Modal = (props) => (
  <div className='main d-flex flex-column align-items-center mt-4'>
    <button
      type='button'
      className='btn btn-dark btn-lg modeBtn shadow-none'
      data-toggle='modal'
      data-target='#modelId'
    >
      Switch Modes
    </button>

    <div
      className='modal fade'
      id='modelId'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='modelTitleId'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Choose Your Mode</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='btngroups d-flex flex-column'>
              <i className='fas fa-assistive-listening-systems fa-4x text-info text-center pb-2'></i>
              <button
                className='btn btn-info btn-block'
                onClick={() => {
                  if (props.location.pathname === "/") {
                    return;
                  }
                  props.history.push("/");
                }}
                data-dismiss='modal'
              >
                Listen Mode
              </button>
              <span>
                SoundQuest will listen for music around you and identify the
                song info within seconds
                <span className='font-weight-bold'>**</span>
              </span>
            </div>
            <div className='btngroups d-flex flex-column'>
              <i className='fas fa-microphone-alt fa-4x text-secondary text-center pb-2'></i>
              <button
                className='btn btn-secondary btn-block'
                onClick={() => {
                  if (
                    props.location.pathname.toLowerCase() === "/singingmode/"
                  ) {
                    return;
                  }
                  props.history.push("/SingingMode/");
                }}
                data-dismiss='modal'
              >
                Singing Mode
              </button>
              <span>
                Sing or hum the song out and we'll show you up to 5 possible
                song matches<span className='font-weight-bold'>**</span>
              </span>
            </div>
            <div className='btngroups d-flex flex-column'>
              <div className='lyricsLogo text-center text-warning pb-2 d-flex align-items-start justify-content-center'>
                <i className='fas fa-quote-left fa-2x'></i>
                <i className='fas fa-music fa-4x'></i>
                <i className='fas fa-quote-right fa-2x pl-1'></i>
              </div>
              <button
                className='btn btn-warning btn-block'
                data-dismiss='modal'
                onClick={() => props.history.push("/LyricsMode/")}
              >
                Lyrics Mode
              </button>
              <span>
                Only know the words? Type in some lyrics and we'll return up to
                5 possible song matches
              </span>
            </div>
            <div className='btngroups d-flex flex-column'>
              <i className='fas fa-search fa-4x pb-2 text-success text-center'></i>
              <button
                className='btn btn-success btn-block'
                onClick={() => props.history.push("/QuestMode/")}
                data-dismiss='modal'
              >
                Quest Mode
              </button>
              <span>
                Have the song name already? Search our database for lyrics,
                album info, media links and more
              </span>
            </div>
            <br />
            <span className='font-italic font-weight-bold'>
              **Microphone access required
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(Modal);
