import React, { Component } from "react";
import "./LoadingView.scss";
import Modal from "../modal/modal";
import ListenResults from "../ResultsViews/ListenResults";
import CoverArt from "../../coverart_1.png";
import FailureView from "../FailureView/FailureView";
import Results from "../ResultsViews/Results";

const lodingMsgs = [
  "We're cooking something up",
  "Keep Calm And Keep Waiting",
  "We're testing your patience",
  "We promise it'll be worth the wait",
  "Searching for stuff...",
  "Trust the Process",
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
const colorSets = [
  { cardBg: "#9DB4AB", title: "#FDFFFC", artist: "#4C2E05" },
  { cardBg: "#235789", title: "#F5F9E9", artist: "#C2C1A5" },
  { cardBg: "#484041", title: "#E8CCBF", artist: "#79AEA3" },
  { cardBg: "#0D1321", title: "#CAE5FF", artist: "#7A6F9B" },
  { cardBg: "#725752", title: "#F5F3BB", artist: "#FFFFFF" },
  { cardBg: "#111111", title: "#FBFBF8", artist: "#696773" },
  { cardBg: "#54494B", title: "#91C7B1", artist: "#F1F7ED" },
  { cardBg: "#D8D2E1", title: "#A5243D", artist: "#6369D1" },
  { cardBg: "#E5B181", title: "#DE6B48", artist: "#F4B9B2" },
  { cardBg: "#033860", title: "#FFFFFF", artist: "#087CA7" },
];

let id = 0;

class LoadingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      stage: "",
      btnMode: "regular",
    };
  }

  componentDidUpdate() {
    if (this.props.stage === "loading") {
      this.props.showLoadingView();
      document.querySelector(".loadingHeader").textContent = this.randomMsg(
        lodingMsgs
      );
      document.querySelector(".modeBtn").classList.add("d-none");

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

  gatherData = async (data) => {
    // Fetch API Keys from node server
    let uri = "http://localhost:8080/getkeys";
    const response = await fetch(uri);
    const keys = await response.json();
    let auddKey = keys[0].audd;

    const formData = new FormData();
    formData.append("api_token", auddKey);

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
    id = 0;

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
    document.querySelector(".modeBtn").classList.remove("d-none");
  };

  mapDataSinging = async (result) => {
    const failureMsg = document.querySelector(".failureMsg");
    const failuerView = document.querySelector(".failureView");
    console.log(result);
    if (!result || result === "null") {
      failureMsg.textContent = this.randomMsg(failureMsgs);
      failuerView.classList.remove("d-none");
      return;
    }
    // Fetch API Keys from node server
    let uri = "http://localhost:8080/getkeys";
    const response = await fetch(uri);
    const keys = await response.json();
    let lastFmKey = keys[0].lastfm;

    result.list.forEach((listItem) => {
      this.fetchCoverArt(listItem.artist, listItem.title, listItem, lastFmKey);
    });

    document.querySelector(".altResults").classList.remove("d-none");
  };

  fetchCoverArt = (artist, title, listItem, key) => {
    // let key = "0410f71d8ac85faf3bbd6d1a58970aaa";
    let newArtist = artist.replace(/ /g, "%20");
    let newTitle = title.replace(/ /g, "%20");

    let request = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${key}&artist=${newArtist}&track=${newTitle}&format=json`;

    fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let colorGroup = this.randomMsg(colorSets);
        let joinedData;
        id += 1;

        if (this.props.mode === "lyrics" || this.props.mode === "quest") {
          joinedData = this.state.data.concat([
            {
              image: result.track.album.image[3]["#text"],
              artist: artist,
              title: title,
              cardBg: colorGroup.cardBg,
              titleColor: colorGroup.title,
              artistColor: colorGroup.artist,
              media: JSON.parse(listItem.media),
              lyrics: listItem.lyrics,
              id: `item-${id}`,
            },
          ]);
        } else {
          joinedData = this.state.data.concat([
            {
              image: result.track.album.image[3]["#text"],
              score: listItem.score,
              artist: artist,
              title: title,
              cardBg: colorGroup.cardBg,
              titleColor: colorGroup.title,
              artistColor: colorGroup.artist,
              id: `item-${id}`,
            },
          ]);
        }

        this.setState({ data: joinedData });
      })
      .catch((err) => {
        console.log("cover art fetch problem ===>", err.message);
        let colorGroup = this.randomMsg(colorSets);
        let joinedData;
        if (this.props.mode === "lyrics" || this.props.mode === "quest") {
          joinedData = this.state.data.concat([
            {
              image: "empty",
              artist: artist,
              title: title,
              cardBg: colorGroup.cardBg,
              titleColor: colorGroup.title,
              artistColor: colorGroup.artist,
              media: JSON.parse(listItem.media),
              lyrics: listItem.lyrics,
              id: `item-${id}`,
            },
          ]);
        } else {
          joinedData = this.state.data.concat([
            {
              image: "empty",
              score: listItem.score,
              artist: artist,
              title: title,
              cardBg: colorGroup.cardBg,
              titleColor: colorGroup.title,
              artistColor: colorGroup.artist,
              id: `item-${id}`,
            },
          ]);
        }
        this.setState({ data: joinedData });
      });
  };

  mapDataLyrics = async (result) => {
    const failureMsg = document.querySelector(".failureMsg");
    const failuerView = document.querySelector(".failureView");
    if (!result || result === "null") {
      failureMsg.textContent = this.randomMsg(failureMsgs);
      failuerView.classList.remove("d-none");
      return;
    }
    // Fetch API Keys from node server
    let uri = "http://localhost:8080/getkeys";
    const response = await fetch(uri);
    const keys = await response.json();
    let lastFmKey = keys[0].lastfm;

    result.forEach((item) => {
      this.fetchCoverArt(item.artist, item.title, item, lastFmKey);
    });

    document.querySelector(".altResults").classList.remove("d-none");
  };

  showFailure = () => {
    const failureMsg = document.querySelector(".failureMsg");
    const failuerView = document.querySelector(".failureView");
    failureMsg.textContent = this.randomMsg(failureMsgs);
    failuerView.classList.remove("d-none");
  };

  render() {
    return (
      <div className='wrapper2 d-flex flex-column align-items-center'>
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
        <Results
          changeText={this.props.changeText}
          showLoadingView={this.props.showLoadingView}
          normal={this.props.normal}
          data={this.state.data}
          stage={this.state.stage}
          changeState={this.changeState}
          randomMsg={this.randomMsg}
          showFailure={this.showFailure}
          mode={this.props.mode}
          resetMedia={this.resetMedia}
        />
        <FailureView
          changeText={this.props.changeText}
          showLoadingView={this.props.showLoadingView}
          normal={this.props.normal}
          changeState={this.changeState}
          mode={this.props.mode}
          resetMedia={this.resetMedia}
        />
        {}
        <Modal btnMode={this.state.btnMode} />
      </div>
    );
  }
}

export default LoadingView;
