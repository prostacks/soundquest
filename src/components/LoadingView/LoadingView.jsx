import React, { Component } from "react";
import "./LoadingView.scss";
import Modal from "../modal/modal";
import ListenResults from "../ResultsViews/ListenResults";
import CoverArt from "../../coverart_1.png";
import FailureView from "../FailureView/FailureView";
import SingingResults from "../ResultsViews/SingingResults";

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

class LoadingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      stage: "",
    };
  }

  componentDidUpdate() {
    if (this.props.stage === "loading") {
      this.props.showLoadingView();
      document.querySelector(".loadingHeader").textContent = this.randomMsg(
        lodingMsgs
      );
      document.querySelector(".loadingView").classList.remove("d-none");
      this.props.changeText(this.props.fetching);
      document.querySelector(".secText").classList.add("fade");
      this.gatherData(this.props.data);
      this.props.changeState();
    }
  }

  randomMsg = (arr) => {
    return arr[Math.round(Math.random() * (lodingMsgs.length - 1))];
  };

  gatherData = (data) => {
    const formData = new FormData();
    let key = "0251e1d511f58db75fa4b8642a65b65a";
    formData.append("api_token", key);

    if (this.props.mode === "listen") {
      formData.append("file", data);
      formData.append("return", "apple_music,spotify");
      let url = "https://api.audd.io/";
      this.fetchData(formData, url, this.mapDataListen);
    } else if (this.props.mode === "singing") {
      formData.append("file", data);
      let url = "https://api.audd.io/recognizeWithOffset/";
      this.fetchData(formData, url, this.mapDataSinging);
    } else {
      formData.append("q", data);
      let url = "https://api.audd.io/findLyrics/";
      this.fetchData(formData, url, this.mapDataLyrics);
    }
  };

  fetchData = (data, url, callback) => {
    let options = {
      method: "POST",
      body: data,
      redirect: "follow",
      mode: "cors",
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setTimeout(() => {
          document.querySelector(".loadingView").classList.add("d-none");
          document.querySelector(".modeBtn").classList.remove("d-none");
          console.log("done");
          callback(result.result);
        }, 3000);
      })
      .catch((err) => {
        setTimeout(() => {
          document.querySelector(".loadingView").classList.add("d-none");
          const failureMsg = document.querySelector(".failureMsg");
          document.querySelector(".modeBtn").classList.remove("d-none");
          const failuerView = document.querySelector(".failureView");
          console.log("Something went wrong:", err.message);
          failureMsg.textContent = this.randomMsg(failureMsgs);
          failuerView.classList.remove("d-none");
          return;
        }, 3000);
      });
  };

  changeState = () => {
    this.setState({ data: [] });
  };

  mapDataListen = (result) => {
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

  mapDataSinging = (result) => {
    const failureMsg = document.querySelector(".failureMsg");
    const failuerView = document.querySelector(".failureView");
    console.log(result);
    if (!result || result === "null") {
      failureMsg.textContent = this.randomMsg(failureMsgs);
      failuerView.classList.remove("d-none");
      return;
    }

    result.list.forEach((listItem) => {
      this.fetchCoverArt(listItem.artist, listItem.title, listItem);
    });

    document.querySelector(".singingResults").classList.remove("d-none");
  };

  fetchCoverArt = (artist, title, listItem) => {
    let key = "0410f71d8ac85faf3bbd6d1a58970aaa";
    let newArtist = artist.replace(/ /g, "%20");
    let newTitle = title.replace(/ /g, "%20");

    let request = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${key}&artist=${newArtist}&track=${newTitle}&format=json`;

    fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let joinedData;
        joinedData = this.state.data.concat([
          {
            image: result.track.album.image[3]["#text"],
            score: listItem.score,
            artist: artist,
            title: title,
          },
        ]);

        this.setState({ data: joinedData });
      })
      .catch((err) => {
        console.log("cover art fetch problem ===>", err.message);
        let joinedData;
        joinedData = this.state.data.concat([
          {
            image: "empty",
            score: listItem.score,
            artist: artist,
            title: title,
          },
        ]);
        this.setState({ data: joinedData });
      });
  };

  mapDataLyrics = (result) => {
    const failureMsg = document.querySelector(".failureMsg");
    const failuerView = document.querySelector(".failureView");
    if (!result || result === "null") {
      failureMsg.textContent = this.randomMsg(failureMsgs);
      failuerView.classList.remove("d-none");
      return;
    }

    console.log(result);
  };

  showFailure = () => {
    const failureMsg = document.querySelector(".failureMsg");
    const failuerView = document.querySelector(".failureView");
    failureMsg.textContent = this.randomMsg(failureMsgs);
    failuerView.classList.remove("d-none");
  };

  render() {
    // console.log(this.state.imgURLs, "<=== render state");
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
          normal={this.props.normal}
        />
        <SingingResults
          changeText={this.props.changeText}
          showLoadingView={this.props.showLoadingView}
          normal={this.props.normal}
          data={this.state.data}
          stage={this.state.stage}
          changeState={this.changeState}
          randomMsg={this.randomMsg}
          showFailure={this.showFailure}
        />
        <FailureView
          changeText={this.props.changeText}
          showLoadingView={this.props.showLoadingView}
          normal={this.props.normal}
          changeState={this.changeState}
        />
        <Modal />
      </div>
    );
  }
}

export default LoadingView;
