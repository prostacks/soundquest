import React, { Component } from "react";
import "../main/main.scss";
import QuestForm from "../../components/QuestForm/QuestForm";
import LoadingView from "../../components/LoadingView/LoadingView";
import { withRouter } from "react-router-dom";

class QuestMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      text: {
        fetching: "Searching database for matching songs...",
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
    return this.setState({ info: data, mode: "quest", stage: "loading" });
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
      <div className='bg-gradient questMode'>
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
            <h2 className='text-success text-center'>
              <i className='fas fa-search'></i> Quest Mode
            </h2>
            <QuestForm
              handleData={this.handleData}
              showAlert={this.showAlert}
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

export default withRouter(QuestMode);
