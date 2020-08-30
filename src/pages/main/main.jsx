import React, { Component } from "react";
import "./main.scss";
import RecordBtn from "../../components/Record-Btn/RecordBtn";
import LoadingView from "../../components/LoadingView/LoadingView";

class Main extends Component {
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
    };
  }

  changeText = (stateString) => {
    document.querySelectorAll(".helpText").forEach((text) => {
      text.textContent = stateString;
      text.classList.add("fade");
    });
  };

  handleData = (data) => {
    return this.setState({ info: data });
  };

  showLoadingView = () => {
    document.querySelector(".wrapper").classList.toggle("d-none");
  };

  render() {
    const { text } = this.state;
    return (
      <div className='bg-gradient'>
        <header id='logo' className='text-center text-light'>
          <h1>
            S<i className='far fa-play-circle'></i>undQuest
          </h1>
        </header>
        <div className='wrapper'>
          <h2 className='text-info text-center'>
            <i className='fas fa-assistive-listening-systems'></i> Listen Mode
          </h2>
          <RecordBtn
            handleData={this.handleData}
            changeText={this.changeText}
          />
          <span className='d-block text-center text-light mt-5 helpText mainText'>
            {text.normal}
          </span>
        </div>
        <LoadingView
          data={this.state.info}
          showLoadingView={this.showLoadingView}
          changeText={this.changeText}
        />
      </div>
    );
  }
}

export default Main;
