import React, { Component } from "react";
import "./main.scss";
import RecordBtn from "../../components/Record-Btn/RecordBtn";
import LoadingView from "../../components/LoadingView/LoadingView";
import { withRouter } from "react-router-dom";

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
    };
  }
  componentDidMount() {
    const constraints = {
      audio: true,
      video: false,
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.setState({ recorder: new MediaRecorder(stream) });
      });

      console.log("getUserMedia supported");
    } else {
      console.log("getUserMedia not supported");
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