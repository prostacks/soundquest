import React, { Component } from "react";
import "../main/main.scss";
import Modal from "../../components/modal/modal";
import QuestForm from "../../components/QuestForm/QuestForm";

class QuestMode extends Component {
  render() {
    return (
      <div className='bg-gradient questMode'>
        <div className='container'>
          <header id='logo' className='text-center text-light'>
            <h1>
              S<i className='far fa-play-circle'></i>undQuest
            </h1>
          </header>
          <div className='wrapper'>
            <h2 className='text-success text-center'>
              <i className='fas fa-search'></i> Quest Mode
            </h2>
            <QuestForm />
            <Modal />
          </div>
        </div>
      </div>
    );
  }
}

export default QuestMode;
