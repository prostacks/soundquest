import React, { useState } from "react";
import Modal from "../../components/modal/modal";
import "./LandingPage.scss";
import { withRouter } from "react-router-dom";
import FeaturePic1 from "../../img/homepage/feature1.jpg";
import FeaturePic2 from "../../img/homepage/feature2.jpg";
import FeaturePic3 from "../../img/homepage/feature3.jpg";
import { useInView } from "react-intersection-observer";

function LandingPage(props) {
  const [btnMode] = useState("home");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
    triggerOnce: true,
  };
  const [ref, inView] = useInView(options);
  const [ref2, inView2] = useInView(options);
  const [ref3, inView3] = useInView(options);

  return (
    <div className='landingContainer' id='page-top'>
      <div
        id='carouselExampleSlidesOnly'
        className='carousel slide homeCarousel'
        data-ride='carousel'
      >
        <div className='carousel-inner'>
          <div className='carousel-item carousel-home-item active'>
            <div className='collage1 images'></div>
          </div>
          <div className='carousel-item carousel-home-item'>
            <div className='collage2 images'></div>
          </div>
          <div className='carousel-item carousel-home-item'>
            <div className='collage3 images'></div>
          </div>
        </div>
      </div>
      <div className='overlay'>
        <div className='landing-wrapper mt-3'>
          <header id='logo' className='text-center text-light'>
            <h1
              onClick={() => {
                props.history.push("/");
              }}
            >
              S<i className='far fa-play-circle'></i>undQuest
            </h1>
          </header>
          <a
            className='text-light github-link text-center'
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/prostacks/soundquest'
          >
            <i aria-label='github link' className='fab fa-github fa-2x'></i>{" "}
            <br />
            View On Github
          </a>
          <div className='jumbotron jumbotron-fluid mt-5'>
            <div className='container text-light col-md-8 '>
              <h2 className='display-4'>
                Find the right <span className='text-warning'>vibe</span>.
              </h2>
              <p className='lead'>
                SoundQuest is a music recognition app powered by the AudD API.
              </p>
              <hr className='my-4 bg-light'></hr>
              <p>
                With four different search modes and an extensive database of
                over 50 Million songs, you'll easily be able to find the track
                you're looking for in seconds.
              </p>
              <div className='btnWrap'>
                <Modal btnMode={btnMode} />
                <a
                  className='btn btn-primary btn-lg mt-3'
                  href='#learnMore'
                  role='button'
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
        <section className='learnMore container col-md-8  text-center text-light py-5'>
          <h3 id='learnMore' className='text-center mb-5'>
            Features
          </h3>
          <div ref={ref} className='features item-1'>
            {inView ? (
              <div className='textContent show left'>
                <h4 className='text-primary'>Music Recognition</h4>
                <p className='lead'>
                  Just heard a song on the radio or at a party? With SoundQuest
                  "Listen Mode" you can record the music around you and receive
                  the song title and artist info in seconds.
                </p>
              </div>
            ) : (
              <div className='textContent left'>
                <h4 className='text-primary'>Music Recognition</h4>
                <p className='lead'>
                  Just heard a song on the radio or at a party? With SoundQuest
                  "Listen Mode" you can record the music around you and receive
                  the song title and artist info in seconds.
                </p>
              </div>
            )}
            {inView ? (
              <img
                src={FeaturePic1}
                alt='party'
                className='home-images right show '
              />
            ) : (
              <img
                src={FeaturePic1}
                alt='party'
                className='home-images right'
              />
            )}
          </div>
          <div ref={ref2} className='features reverse item-2'>
            {inView2 ? (
              <div className='textContent right show'>
                <h4 className='text-warning'>Vocal Recognition</h4>
                <p className='lead'>
                  Got the melody of the song in your head? Use "Singing Mode" to
                  record the melody of the song by singing or humming. We'll
                  give up to 10 matches for the best possible result.
                </p>
              </div>
            ) : (
              <div className='textContent right'>
                <h4 className='text-warning'>Vocal Recognition</h4>
                <p className='lead'>
                  Got the melody of the song in your head? Use "Singing Mode" to
                  record the melody of the song by singing or humming. We'll
                  give up to 10 matches for the best possible result.
                </p>
              </div>
            )}
            {inView2 ? (
              <img
                src={FeaturePic2}
                alt='singing'
                className='home-images left show'
              />
            ) : (
              <img
                src={FeaturePic2}
                alt='singing'
                className='home-images left'
              />
            )}
          </div>
          <div ref={ref3} className='features item-3'>
            {inView3 ? (
              <div className='textContent left show'>
                <h4 className='text-info'>Music Library</h4>
                <p className='lead'>
                  Use either "Quest" or "Lyrics" mode to search the database for
                  any song. We'll provide up to 10 matches with lyrics, song
                  info, as well as links to YouTube, SoundCloud and Spotify.
                </p>
              </div>
            ) : (
              <div className='textContent left'>
                <h4 className='text-info'>Music Library</h4>
                <p className='lead'>
                  Use either "Quest" or "Lyrics" mode to search the database for
                  any song. We'll provide up to 10 matches with lyrics, song
                  info, as well as links to YouTube, SoundCloud and Spotify.
                </p>
              </div>
            )}
            {inView3 ? (
              <img
                src={FeaturePic3}
                alt='search'
                className='home-images right show'
              />
            ) : (
              <img
                src={FeaturePic3}
                alt='search'
                className='home-images right'
              />
            )}
          </div>
          <a href='#page-top ' className='btn btn-link'>
            Back To Top
          </a>
        </section>
        <footer className='text-light text-center py-4'>
          Built by{" "}
          <a
            href='https://prostacks.io'
            target='_blank'
            rel='noopener noreferrer'
          >
            ProStacks
          </a>
          . View more of my projects{" "}
          <a
            href='https://www.prostacks.io/projects.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            here
          </a>
          .
        </footer>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
