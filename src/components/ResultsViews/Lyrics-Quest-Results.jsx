import React, { Component } from "react";
import CoverArt from "../../coverart_1.png";
import confetti from "canvas-confetti";

const guessMsgs = [
  "Sounds right?",
  "Hot? Cold?",
  "Was this it?",
  "Here you go",
];

const sucessMsgs = [
  "Awesome!",
  "Bingo!",
  "Match Found!",
  "We knew we'd find it",
];

class LyricsQuestResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  componentDidUpdate() {
    if (document.querySelector(".carousel-item")) {
      document.querySelector(".carousel-item").classList.add("active");
    }
    if (
      document.querySelector(".search-agian") &&
      document.querySelectorAll(".matchBtnGroups")
    ) {
      document.querySelector(".search-agian").classList.add("d-none");

      document.querySelectorAll(".matchBtnGroups").forEach((matchBtns) => {
        matchBtns.classList.remove("d-none");
      });
    }
  }

  header = () => {
    if (this.state.success === true) {
      return this.props.randomMsg(sucessMsgs);
    } else {
      return this.props.randomMsg(guessMsgs);
    }
  };
  render() {
    return (
      <div className='singingResults container text-center mt-3 d-none col-md-6 mx-auto'>
        <div
          id='carouselId'
          className='carousel slide mt-3'
          data-interval='false'
        >
          <div className='carousel-inner' role='listbox'>
            {this.props.data.map((item, index) => {
              let image = () => {
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

              return (
                <div key={index} className='carousel-item'>
                  <h3 className='matchHeader text-light'>{this.header()}</h3>
                  <span className='matchScore text-light'>{`${item.score}% Match`}</span>
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

                  <div className='matchBtnGroups mt-4'>
                    <button
                      role='img'
                      className='btn btn-success match-btn mx-2 correct shadow-none'
                      aria-label='correct match'
                      onClick={() => {
                        document
                          .querySelector(".search-again")
                          .classList.remove("d-none");
                        document
                          .querySelectorAll(".matchBtnGroups")
                          .forEach((matchBtn) => {
                            matchBtn.classList.add("d-none");
                          });
                        this.setState({ success: true });

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
                            .querySelector(".singingResults")
                            .classList.add("d-none");
                          this.props.changeState();
                        }
                      }}
                    >
                      Nope, Next
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className='btn btn-primary search-again d-none shadow-nome text-center mt-5'
          onClick={() => {
            this.props.changeText(this.props.normal);
            document.querySelector(".mainText").classList.remove("fade");
            this.props.showLoadingView();
            document.querySelector(".singingResults").classList.add("d-none");
            document.querySelector(".search-again").classList.add("d-none");
            document.getElementById("audioPlayer").pause();
            this.props.changeState();
            this.setState({ success: false });
          }}
        >
          Search Again
        </button>
      </div>
    );
  }
}

export default LyricsQuestResults;
