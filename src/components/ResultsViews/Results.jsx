import React from "react";
import "./Results.scss";
import CoverArt from "../../coverart_1.png";
import confetti from "canvas-confetti";
import Soundcloud from "../../SoundCloud-Orange-Badge.png";
import Spotify from "../../Spotify_Logo_CMYK_Green.png";

const guessMsgs = [
  "Sounds right?",
  "Hot? Cold?",
  "Was this it?",
  "Here you go",
  "Another One.",
];

const sucessMsgs = [
  "Awesome!",
  "Bingo!",
  "Match Found!",
  "We knew we'd find it",
];

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      mode: "",
      lyricBox: false,
      mediaBtn: false,
      mediaBox: false,
      searchAgain: false,
      matchBtnGroup: true,
      mediaAlert: false,
      lyricsAlert: false,
    };
  }

  setDefaults = () => {
    this.setState({
      success: false,
      mode: "",
      lyricBox: false,
      mediaBtn: false,
      mediaBox: false,
      searchAgain: false,
      matchBtnGroup: true,
    });
  };

  successMsg = () => {
    return this.props.randomMsg(sucessMsgs);
  };

  guessMsg = () => {
    return this.props.randomMsg(guessMsgs);
  };

  header = () => {
    if (this.state.success) {
      return this.props.randomMsg(sucessMsgs);
    } else {
      return this.props.randomMsg(guessMsgs);
    }
  };

  youtube = (link) => {
    let url = link;
    url = url.substr(url.indexOf("=") + 1);
    let newUrl = "https://www.youtube.com/embed/" + url;
    return newUrl;
  };

  render() {
    return (
      <div className='altResults container text-center mt-3 d-none col-md-6 mx-auto'>
        <div
          id='carouselId'
          className='carousel slide mt-3'
          data-interval='false'
        >
          <div className='carousel-inner' role='listbox'>
            {this.props.data.map((item, index) => {
              const image = () => {
                if (
                  item.image === "empty" ||
                  item.image === undefined ||
                  item.image === ""
                ) {
                  return CoverArt;
                } else {
                  return item.image;
                }
              };

              if (item.id === "item-1") {
                return (
                  <div key={item.id} className='carousel-item active'>
                    {this.state.success ? (
                      <h3 className='matchHeader text-light'>
                        {this.props.randomMsg(sucessMsgs)}
                      </h3>
                    ) : (
                      <h3 className='matchHeader text-light'>
                        {this.props.randomMsg(guessMsgs)}
                      </h3>
                    )}

                    {this.props.mode === "singing" ? (
                      <span className='matchScore text-light'>{`${item.score}% Match`}</span>
                    ) : null}
                    <div className='card mt-3 album-card w-75 mx-auto'>
                      <img
                        src={image()}
                        alt={item.title}
                        className='card-img-top cover-art'
                      ></img>
                      <div
                        className='card-body'
                        style={{ backgroundColor: item.cardBg }}
                      >
                        <h5
                          className='card-title song'
                          style={{ color: item.titleColor }}
                        >
                          {item.title}
                        </h5>
                        <h6
                          className='card-subtitle artist mb-2'
                          style={{ color: item.artistColor }}
                        >
                          {item.artist}
                        </h6>
                      </div>
                    </div>

                    <div className='lyrics-quest mt-4'>
                      {this.state.lyricsAlert ? (
                        <div
                          className='alert alert-warning mt-3 mx-auto'
                          role='alert'
                        >
                          No lyrics available for this title
                        </div>
                      ) : null}
                      {this.state.lyricBox ? (
                        <div className='lyricsBox'>
                          <h5 className='text-center'>{`${item.title} Lyrics`}</h5>
                          <div className='lyricsContent'>{item.lyrics}</div>
                        </div>
                      ) : null}
                      {this.state.mediaBtn ? (
                        <button
                          onClick={() => {
                            if (
                              item.media === [] ||
                              item.media === "" ||
                              item.media === undefined ||
                              item.media.length === 0 ||
                              !item.media
                            ) {
                              this.setState(
                                { mediaBtn: false, mediaAlert: true },
                                () => {
                                  setTimeout(() => {
                                    this.setState({ mediaAlert: false });
                                  }, 5000);
                                }
                              );
                              return;
                            }
                            this.setState({ mediaBtn: false, mediaBox: true });
                          }}
                          className='btn btn-success mt-3 mediaLinkBtn'
                        >
                          Show Media Links
                        </button>
                      ) : null}
                      {this.state.mediaAlert ? (
                        <div
                          className='alert alert-warning mt-3 mx-auto'
                          role='alert'
                        >
                          No media links available for this title
                        </div>
                      ) : null}
                      {this.state.mediaBox ? (
                        <div className='mediaBox mt-3'>
                          <h5 className='text-light'>Media Links</h5>
                          {item.media.map((media, key) => {
                            if (media.provider === "youtube") {
                              return (
                                <div
                                  key={key}
                                  className='iframe-container mt-4'
                                >
                                  <iframe
                                    title={index}
                                    width='560'
                                    height='315'
                                    src={this.youtube(media.url)}
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                    className='iframe'
                                  ></iframe>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                          <div className='musicLogos text-light'>
                            {item.media.map((media, key) => {
                              if (media.provider === "soundcloud") {
                                return (
                                  <a
                                    key={key}
                                    className='altLinks'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={media.url}
                                  >
                                    <img
                                      className='soundcloud w-75'
                                      src={Soundcloud}
                                      alt='Soundcloud Link'
                                    />
                                  </a>
                                );
                              } else {
                                return null;
                              }
                            })}
                            {item.media.map((media, key) => {
                              if (media.provider === "spotify") {
                                return (
                                  <a
                                    key={key}
                                    rel='noopener noreferrer'
                                    target='_blank'
                                    href={media.url}
                                    className='altLinks'
                                  >
                                    <div className='spotify-bg'>
                                      <img
                                        className=' spotify w-75'
                                        src={Spotify}
                                        alt='Spotify Music Link'
                                      />
                                    </div>
                                  </a>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {this.state.matchBtnGroup ? (
                      <div className='matchBtnGroups mt-4'>
                        <button
                          role='img'
                          className='btn btn-success match-btn mx-2 correct shadow-none'
                          aria-label='correct match'
                          onClick={() => {
                            if (this.props.mode === "quest") {
                              if (
                                item.lyrics === [] ||
                                item.lyrics === "" ||
                                item.lyrics === undefined ||
                                !item.lyrics
                              ) {
                                this.setState(
                                  {
                                    mediaBtn: true,
                                    lyricsAlert: true,
                                  },
                                  () => {
                                    setTimeout(() => {
                                      this.setState({ lyricsAlert: false });
                                    }, 5000);
                                  }
                                );
                              } else {
                                this.setState({
                                  lyricBox: true,
                                  mediaBtn: true,
                                });
                              }
                            }
                            if (this.props.mode === "lyrics") {
                              if (
                                item.media === [] ||
                                item.media === "" ||
                                item.media === undefined ||
                                item.media.length === 0
                              ) {
                                this.setState({ mediaAlert: true }, () => {
                                  setTimeout(() => {
                                    this.setState({ mediaAlert: false });
                                  }, 5000);
                                });
                              } else {
                                this.setState({ mediaBox: true });
                              }
                            }
                            this.setState({
                              searchAgain: true,
                              matchBtnGroup: false,
                              success: true,
                            });

                            let duration = 5 * 1000;
                            let animationEnd = Date.now() + duration;
                            let defaults = {
                              startVelocity: 30,
                              spread: 360,
                              ticks: 60,
                              zIndex: 0,
                            };

                            function randomInRange(min, max) {
                              return Math.random() * (max - min) + min;
                            }

                            const interval = setInterval(function () {
                              let timeLeft = animationEnd - Date.now();

                              if (timeLeft <= 0) {
                                return clearInterval(interval);
                              }

                              let particleCount = 75 * (timeLeft / duration);
                              // since particles fall down, start a bit higher than random
                              confetti(
                                Object.assign({}, defaults, {
                                  particleCount,
                                  origin: {
                                    x: randomInRange(0.1, 0.3),
                                    y: Math.random() - 0.2,
                                  },
                                })
                              );
                              confetti(
                                Object.assign({}, defaults, {
                                  particleCount,
                                  origin: {
                                    x: randomInRange(0.7, 0.9),
                                    y: Math.random() - 0.2,
                                  },
                                })
                              );
                            }, 250);
                          }}
                        >
                          That's It!
                        </button>
                        <button
                          role='img'
                          className='btn btn-danger match-btn wrong mx-2 shadow-none'
                          href='#carouselId'
                          data-slide='next'
                          aria-label='wrong match'
                          onClick={() => {
                            this.props.data.shift();
                            console.log(this.props.data.length);
                            if (this.props.data.length === 0) {
                              this.props.showFailure();
                              document
                                .querySelector(".altResults")
                                .classList.add("d-none");
                              this.props.changeState();
                              this.setDefaults();
                            }
                          }}
                        >
                          Nope, Next
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              } else {
                return (
                  <div key={item.id} className='carousel-item'>
                    {this.state.success ? (
                      <h3 className='matchHeader text-light'>
                        {this.props.randomMsg(sucessMsgs)}
                      </h3>
                    ) : (
                      <h3 className='matchHeader text-light'>
                        {this.props.randomMsg(guessMsgs)}
                      </h3>
                    )}
                    {this.props.mode === "singing" ? (
                      <span className='matchScore text-light'>{`${item.score}% Match`}</span>
                    ) : null}
                    <div className='card mt-3 album-card w-75 mx-auto'>
                      <img
                        src={image()}
                        alt={item.title}
                        className='card-img-top cover-art'
                      ></img>
                      <div
                        className='card-body'
                        style={{ backgroundColor: item.cardBg }}
                      >
                        <h5
                          className='card-title song'
                          style={{ color: item.titleColor }}
                        >
                          {item.title}
                        </h5>
                        <h6
                          className='card-subtitle artist mb-2'
                          style={{ color: item.artistColor }}
                        >
                          {item.artist}
                        </h6>
                      </div>
                    </div>

                    <div className='lyrics-quest mt-4'>
                      {this.state.lyricsAlert ? (
                        <div
                          className='alert alert-warning mt-3 mx-auto'
                          role='alert'
                        >
                          No lyrics available for this title
                        </div>
                      ) : null}
                      {this.state.lyricBox ? (
                        <div className='lyricsBox'>
                          <h5 className='text-center'>{`${item.title} Lyrics`}</h5>
                          <div id={`lyric${index}`} className='lyricsContent'>
                            {item.lyrics}
                          </div>
                        </div>
                      ) : null}
                      {this.state.mediaBtn ? (
                        <button
                          id={`mediaBtn${index}`}
                          onClick={() => {
                            if (
                              item.media === [] ||
                              item.media === "" ||
                              item.media === undefined ||
                              item.media.length === 0 ||
                              !item.media
                            ) {
                              this.setState(
                                { mediaBtn: false, mediaAlert: true },
                                () => {
                                  setTimeout(() => {
                                    this.setState({ mediaAlert: false });
                                  }, 5000);
                                }
                              );
                              return;
                            }
                            this.setState({ mediaBtn: false, mediaBox: true });
                          }}
                          className='btn btn-success mt-3 mediaLinkBtn'
                        >
                          Show Media Links
                        </button>
                      ) : null}
                      {this.state.mediaAlert ? (
                        <div
                          className='alert alert-warning mt-3 mx-auto'
                          role='alert'
                        >
                          No media links available for this title
                        </div>
                      ) : null}
                      {this.state.mediaBox ? (
                        <div className='mediaBox mt-3'>
                          <h5 className='text-light'>Media Links</h5>
                          {item.media.map((media, key) => {
                            if (media.provider === "youtube") {
                              return (
                                <div
                                  key={key}
                                  className='iframe-container mt-4'
                                >
                                  <iframe
                                    title={index}
                                    width='560'
                                    height='315'
                                    src={this.youtube(media.url)}
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                    className='iframe'
                                  ></iframe>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                          <div className='musicLogos text-light'>
                            {item.media.map((media, key) => {
                              if (media.provider === "soundcloud") {
                                return (
                                  <a
                                    key={key}
                                    className='altLinks'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={media.url}
                                  >
                                    <img
                                      className='soundcloud w-75'
                                      src={Soundcloud}
                                      alt='Soundcloud Link'
                                    />
                                  </a>
                                );
                              } else {
                                return null;
                              }
                            })}
                            {item.media.map((media, key) => {
                              if (media.provider === "spotify") {
                                return (
                                  <a
                                    key={key}
                                    rel='noopener noreferrer'
                                    target='_blank'
                                    href={media.url}
                                    className='altLinks'
                                  >
                                    <div className='spotify-bg'>
                                      <img
                                        className=' spotify w-75'
                                        src={Spotify}
                                        alt='Spotify Music Link'
                                      />
                                    </div>
                                  </a>
                                );
                              } else {
                                return null;
                              }
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {this.state.matchBtnGroup ? (
                      <div className='matchBtnGroups mt-4'>
                        <button
                          role='img'
                          className='btn btn-success match-btn mx-2 correct shadow-none'
                          aria-label='correct match'
                          onClick={() => {
                            if (this.props.mode === "quest") {
                              if (
                                item.lyrics === [] ||
                                item.lyrics === "" ||
                                item.lyrics === undefined ||
                                !item.lyrics
                              ) {
                                this.setState(
                                  {
                                    mediaBtn: true,
                                    lyricsAlert: true,
                                  },
                                  () => {
                                    setTimeout(() => {
                                      this.setState({ lyricsAlert: false });
                                    }, 5000);
                                  }
                                );
                              } else {
                                this.setState({
                                  lyricBox: true,
                                  mediaBtn: true,
                                });
                              }
                            }
                            if (this.props.mode === "lyrics") {
                              console.log(item.media, "<==== wtf");
                              if (
                                item.media === [] ||
                                item.media === "" ||
                                item.media === undefined ||
                                item.media.length === 0
                              ) {
                                this.setState({ mediaAlert: true }, () => {
                                  setTimeout(() => {
                                    this.setState({ mediaAlert: false });
                                  }, 5000);
                                });
                              } else {
                                this.setState({ mediaBox: true });
                              }
                            }
                            this.setState({
                              searchAgain: true,
                              matchBtnGroup: false,
                              success: true,
                            });

                            let duration = 5 * 1000;
                            let animationEnd = Date.now() + duration;
                            let defaults = {
                              startVelocity: 30,
                              spread: 360,
                              ticks: 60,
                              zIndex: 0,
                            };

                            function randomInRange(min, max) {
                              return Math.random() * (max - min) + min;
                            }

                            const interval = setInterval(function () {
                              let timeLeft = animationEnd - Date.now();

                              if (timeLeft <= 0) {
                                return clearInterval(interval);
                              }

                              let particleCount = 75 * (timeLeft / duration);
                              // since particles fall down, start a bit higher than random
                              confetti(
                                Object.assign({}, defaults, {
                                  particleCount,
                                  origin: {
                                    x: randomInRange(0.1, 0.3),
                                    y: Math.random() - 0.2,
                                  },
                                })
                              );
                              confetti(
                                Object.assign({}, defaults, {
                                  particleCount,
                                  origin: {
                                    x: randomInRange(0.7, 0.9),
                                    y: Math.random() - 0.2,
                                  },
                                })
                              );
                            }, 250);
                          }}
                        >
                          That's It!
                        </button>
                        <button
                          role='img'
                          className='btn btn-danger match-btn wrong mx-2 shadow-none'
                          href='#carouselId'
                          data-slide='next'
                          aria-label='wrong match'
                          onClick={() => {
                            this.props.data.shift();
                            console.log(this.props.data.length);
                            if (this.props.data.length === 0) {
                              this.props.showFailure();
                              document
                                .querySelector(".altResults")
                                .classList.add("d-none");
                              this.props.changeState();
                              this.setDefaults();
                            }
                          }}
                        >
                          Nope, Next
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>
        </div>
        {this.state.searchAgain ? (
          <button
            className='btn btn-primary search-again shadow-nome text-center mt-5'
            onClick={() => {
              this.props.changeText(this.props.normal);
              if (this.props.mode === "singing") {
                document.querySelector(".mainText").classList.remove("fade");
              }
              this.props.showLoadingView();
              document.querySelector(".altResults").classList.add("d-none");
              document.getElementById("audioPlayer").pause();
              this.props.changeState();
              this.setDefaults();
            }}
          >
            Search Again
          </button>
        ) : null}
      </div>
    );
  }
}

export default Results;
