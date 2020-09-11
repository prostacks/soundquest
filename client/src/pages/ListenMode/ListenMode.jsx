import React, { Component } from "react";
import "./main.scss";
import RecordBtn from "../../components/Record-Btn/RecordBtn";
import LoadingView from "../../components/LoadingView/LoadingView";
import { withRouter } from "react-router-dom";
import MediaRecorderPDF from "../../media_recorder_for_ios.pdf";

class ListenMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      text: {
        normal:
          "Press & hold the record button between 5 and 10 seconds for optimal results",
        recording: "Listening for music...",
        fetching: "Indentifying audio data...",
      },
      mode: "",
      stage: "",
      recorder: null,
      iOS: "",
      mediaDevices: false,
    };
  }
  componentDidMount() {
    const constraints = {
      audio: true,
      video: false,
    };
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      MediaRecorder
    ) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.setState({
          recorder: new MediaRecorder(stream),
          mediaDevices: true,
        });
      });

      console.log("getUserMedia supported");
    } else {
      console.log("getUserMedia not supported");
      this.setState({ mediaDevices: false });
      if (navigator.userAgent.includes("CriOS")) {
        this.setState({ iOS: "chrome" });
      } else if (
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
      ) {
        this.setState({ iOS: "safari" });
      }
    }
  }

  changeState = () => {
    return this.setState({ stage: "normal" });
  };

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
    return this.setState({ info: data, mode: "listen", stage: "loading" });
  };

  showLoadingView = () => {
    document.querySelector(".wrapper").classList.toggle("d-none");
  };

  render() {
    const { text } = this.state;
    return (
      <div className='bg-gradient'>
        <header id='logo' className='text-center text-light'>
          <h1
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            S<i className='far fa-play-circle d-inline'></i>undQuest
          </h1>
        </header>
        {this.state.iOS === "safari" ? (
          <div className='alert alert-danger' role='alert'>
            Are you using an iOS device?{" "}
            <a
              href={MediaRecorderPDF}
              target='_blank'
              rel='noopener noreferrer'
              className='alert-link'
            >
              Click here
            </a>{" "}
            for instructions on how to enable the 'Media Recorder' feature for
            your device.
          </div>
        ) : null}
        {this.state.iOS === "chrome" ? (
          <div className='alert alert-danger' role='alert'>
            Are you using an iOS device? Chrome browser is not supported via
            iOS. You must use Safari and enable the safari{" "}
            <a
              href={MediaRecorderPDF}
              target='_blank'
              rel='noopener noreferrer'
              className='alert-link'
            >
              Media Recorder
            </a>{" "}
            in your device settings for app to work properly.
          </div>
        ) : null}
        <div className='wrapper'>
          <h2 className='text-info text-center'>
            <i className='fas fa-assistive-listening-systems'></i> Listen Mode
          </h2>
          <RecordBtn
            handleData={this.handleData}
            changeText={this.changeText}
            recording={this.state.text.recording}
            hideModal={this.hideModal}
            recorder={this.state.recorder}
            mediaDevices={this.state.mediaDevices}
          />
          <span className='d-block text-center text-light mt-5 helpText mainText'>
            {text.normal}
          </span>
        </div>
        <LoadingView
          data={this.state.info}
          showLoadingView={this.showLoadingView}
          changeText={this.changeText}
          mode={this.state.mode}
          fetching={this.state.text.fetching}
          normal={this.state.text.normal}
          stage={this.state.stage}
          hideModal={this.hideModal}
          changeState={this.changeState}
        />
      </div>
    );
  }
}

export default withRouter(ListenMode);
