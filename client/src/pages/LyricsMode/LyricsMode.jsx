import React, { Component } from "react";
import "../ListenMode/main.scss";
import LyricsForm from "../../components/LyricsForm/LyricsForm";
import LoadingView from "../../components/LoadingView/LoadingView";
import { withRouter } from "react-router-dom";

class LyricsMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      text: {
        fetching: "Searching database for matching lyrics...",
      },
      mode: "",
      stage: "",
    };
  }

  showAlert() {
    let alert = document.querySelector(".alert");
    alert.classList.replace("fade", "show");

    setTimeout(() => {
      alert.classList.replace("show", "fade");
    }, 3000);
  }

  showLoadingView = () => {
    document.querySelector(".wrapper").classList.toggle("d-none");
  };

  handleData = (data) => {
    return this.setState({ info: data, mode: "lyrics", stage: "loading" });
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

  changeState = () => {
    return this.setState({ stage: "normal" });
  };
  render() {
    return (
      <div className='bg-gradient lyricsMode'>
        <div className='container'>
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
            <h2 className='text-warning text-center'>
              <i className='fas fa-music'></i> Lyrics Mode
            </h2>
            <LyricsForm
              showAlert={this.showAlert}
              handleData={this.handleData}
            />
          </div>
          <LoadingView
            data={this.state.info}
            mode={this.state.mode}
            stage={this.state.stage}
            showLoadingView={this.showLoadingView}
            changeText={this.changeText}
            fetching={this.state.text.fetching}
            changeState={this.changeState}
            hideModal={this.hideModal}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(LyricsMode);
