import React, { Component } from "react";
import "../main/main.scss";
import RecordBtn from "../../components/Record-Btn/RecordBtn";
import LoadingView from "../../components/LoadingView/LoadingView";

class SingingMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      text: {
        normal:
          "Sing or hum the song between 5 and 15 seconds for optimal results",
        recording: "Recording vocal input...",
        fetching: "Indentifying audio data...",
      },
      mode: "",
    };
  }
  changeText = () => {
    let helpText = document.querySelector(".helpText");
    helpText.textContent = "Listening...";
    helpText.classList.add("fade");
  };

  handleData = (data) => {
    return this.setState({ info: data, mode: "singing" });
  };

  showLoadingView = () => {
    document.querySelector(".wrapper").classList.toggle("d-none");
  };

  render() {
    return (
      <div className='bg-gradient singingMode'>
        <header id='logo' className='text-center text-light'>
          <h1>
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
          />
          <span className='d-block text-center text-light mt-5 helpText'></span>
        </div>
        <LoadingView
          data={this.state.info}
          mode={this.state.mode}
          showLoadingView={this.showLoadingView}
          changeText={this.changeText}
        />
      </div>
    );
  }
}

export default SingingMode;
