import React, { Component } from "react";
import "../ListenMode/main.scss";
import RecordBtn from "../../components/Record-Btn/RecordBtn";
import LoadingView from "../../components/LoadingView/LoadingView";
import { withRouter } from "react-router-dom";

class SingingMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      text: {
        normal:
          "Press & hold the record button for 10 to 15 seconds while singing or humming the melody.",
        recording: "Recording vocal input...",
        fetching: "Indentifying audio data...",
      },
      mode: "",
      stage: "",
      recorder: null,
    };
  }
  componentDidMount() {
    const constraints = {
      audio: true,
      video: false,
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.setState({ recorder: new MediaRecorder(stream) });
    });
  }

  changeText = (stateString) => {
    document.querySelectorAll(".helpText").forEach((text) => {
      text.textContent = stateString;
      text.classList.add("fade");
    });
  };

  hideModal = () => {
    document.querySelector(".modeBtn").classList.add("d-none");
  };

  handleData = (data) => {
    return this.setState({ info: data, mode: "singing", stage: "loading" });
  };

  changeState = () => {
    return this.setState({ stage: "normal" });
  };

  showLoadingView = () => {
    document.querySelector(".wrapper").classList.toggle("d-none");
  };

  render() {
    return (
      <div className='bg-gradient singingMode'>
        <header id='logo' className='text-center text-light'>
          <h1
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            S<i className='far fa-play-circle'></i>undQuest
          </h1>
        </header>
        <div className='wrapper'>
          <h2 className='text-light text-center'>
            <i className='fas fa-microphone-alt'></i> Singing Mode
          </h2>
          <RecordBtn
            changeText={this.changeText}
            handleData={this.handleData}
            recording={this.state.text.recording}
            hideModal={this.hideModal}
            recorder={this.state.recorder}
          />
          <span className='d-block text-center text-light mt-5 helpText mainText'>
            {this.state.text.normal}
          </span>
        </div>
        <LoadingView
          data={this.state.info}
          mode={this.state.mode}
          stage={this.state.stage}
          showLoadingView={this.showLoadingView}
          changeText={this.changeText}
          fetching={this.state.text.fetching}
          normal={this.state.text.normal}
          changeState={this.changeState}
          hideModal={this.hideModal}
        />
      </div>
    );
  }
}

export default withRouter(SingingMode);
