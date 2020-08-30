import React, { Component } from "react";
import "../main/main.scss";
import Modal from "../../components/modal/modal";
import LyricsForm from "../../components/LyricsForm/LyricsForm";

class LyricsMode extends Component {
  render() {
    return (
      <div className='bg-gradient lyricsMode'>
        <div className='container'>
          <header id='logo' className='text-center text-light'>
            <h1>
              S<i className='far fa-play-circle'></i>undQuest
            </h1>
          </header>
          <div className='wrapper'>
            <h2 className='text-warning text-center'>
              <i className='fas fa-music'></i> Lyrics Mode
            </h2>
            <LyricsForm />

            <Modal />
          </div>
        </div>
      </div>
    );
  }
}

export default LyricsMode;
