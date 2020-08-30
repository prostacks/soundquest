import React, { Component } from "react";
import "./LoadingView.scss";
import Modal from "../modal/modal";
import ListenResults from "../ResultsViews/ListenResults";
import CoverArt from "../../coverart_1.png";
import FailureView from "../FailureView/FailureView";

const lodingMsgs = [
  "We're cooking something up",
  "Keep Calm And Keep Waiting",
  "We're testing your patience",
  "We promise it'll be worth the wait",
  "Searching for stuff...",
  "Oh sorry, you're still here?",
];

const failureMsgs = [
  "We can't get it right every time",
  "Well...this is ackward.",
  "Whoops.",
  "Task failed successfully.",
  "There's always a next time",
  "We we're bug free until now",
  "Errors...they're everywhere!",
];

//Elements

class LoadingView extends Component {
  componentDidUpdate() {
    this.props.showLoadingView();
    document.querySelector(".loadingHeader").textContent = this.randomMsg(
      lodingMsgs
    );
    document.querySelector(".loadingView").classList.remove("d-none");
    this.props.changeText("Indentifying audio data...");
    document.querySelector(".secText").classList.add("fade");
    document.querySelector(".main").classList.add("d-none");
    this.fetchData(this.props.data);
  }

  randomMsg = (arr) => {
    return arr[Math.round(Math.random() * (lodingMsgs.length - 1))];
  };

  fetchData = (data) => {
    const formData = new FormData();
    let key = "0251e1d511f58db75fa4b8642a65b65a";
    formData.append("file", data);
    formData.append("return", "apple_music,spotify");
    formData.append("api_token", key);

    let options = {
      method: "POST",
      body: formData,
      redirect: "follow",
      mode: "cors",
    };

    fetch("https://api.audd.io/", options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setTimeout(() => {
          document.querySelector(".loadingView").classList.add("d-none");
          console.log("done");
          this.mapData(result.result);
        }, 3000);
      })
      .catch((err) => {
        setTimeout(() => {
          document.querySelector(".loadingView").classList.add("d-none");
          const failureMsg = document.querySelector(".failureMsg");
          const failuerView = document.querySelector(".failureView");
          console.log("Something went wrong:", err.message);
          failureMsg.textContent = this.randomMsg(failureMsgs);
          failuerView.classList.remove("d-none");
          return;
        }, 3000);
      });
  };

  mapData = (result) => {
    console.log(result);
    const coverArt = document.querySelector(".cover-art");
    const song = document.querySelector(".song");
    const artist = document.querySelector(".artist");
    const album = document.querySelector(".album");
    const cardBody = document.querySelector(".card-body");
    const audioPlayer = document.getElementById("audioPlayer");
    const previewText = document.querySelector(".preview");
    const appleLink = document.getElementById("appleLink");
    const spotifyLink = document.getElementById("spotifyLink");
    const otherLink = document.getElementById("otherLink");
    const failureMsg = document.querySelector(".failureMsg");
    const failuerView = document.querySelector(".failureView");

    if (!result || result === "null") {
      failureMsg.textContent = this.randomMsg(failureMsgs);
      failuerView.classList.remove("d-none");
      return;
    }
    document.querySelector(".results").classList.remove("d-none");
    song.textContent = result.title;
    artist.textContent = result.artist;
    if (result.album === result.title) {
      album.style.display = "none";
    } else {
      album.style.display = "block";
      album.textContent = result.album;
    }

    if (!result.spotify) {
      coverArt.setAttribute("src", CoverArt);
      spotifyLink.style.display = "none";
    } else {
      coverArt.setAttribute("src", result.spotify.album.images[0].url);
      spotifyLink.setAttribute("href", result.spotify.external_urls.spotify);
    }
    coverArt.setAttribute("alt", result.title);

    if (!result.apple_music) {
      cardBody.style.backgroundColor = "#333";
      song.style.color = "#fdfcfa";
      artist.style.color = "#f3f0e8";
      album.style.color = "#fff";
      appleLink.style.display = "none";
      audioPlayer.style.display = "none";
      previewText.style.display = "none";
    } else {
      cardBody.style.backgroundColor = "#" + result.apple_music.artwork.bgColor;
      song.style.color = "#" + result.apple_music.artwork.textColor1;
      artist.style.color = "#" + result.apple_music.artwork.textColor2;
      album.style.color = "#" + result.apple_music.artwork.textColor3;
      appleLink.setAttribute("href", result.apple_music.url);
      appleLink.style.display = "block";
      audioPlayer.style.display = "block";
      previewText.style.display = "block";
      audioPlayer.src = result.apple_music.previews[0].url;
    }
    otherLink.setAttribute("href", result.song_link);
  };

  render() {
    return (
      <div className='wrapper2'>
        <div className='loadingView text-center d-none'>
          <h2 className='loadingHeader text-light mt-5'> </h2>
          <div className='spinner-border mt-5' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
          <span className='d-block text-center text-light mt-5 helpText secText'></span>
        </div>
        <ListenResults
          changeText={this.props.changeText}
          showLoadingView={this.props.showLoadingView}
        />
        <FailureView
          changeText={this.props.changeText}
          showLoadingView={this.props.showLoadingView}
        />
        <Modal />
      </div>
    );
  }
}

export default LoadingView;
