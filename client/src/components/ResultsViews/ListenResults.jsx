import React from "react";
import apple from "../../img/Web_SVG/US-UK_Apple_Music_Badge_RGB.svg";
import spotfiy from "../../img/Spotify_Logo_CMYK_Green.png";
import "../LoadingView/LoadingView.scss";
import { withRouter } from "react-router-dom";

function ListenResults(props) {
  return (
    <div className='results d-none container text-center col-md-6 mx-auto'>
      <div className='card album-card w-75 mx-auto mt-5'>
        <img
          src='https://i.scdn.co/image/d3acaeb069f37d8e257221f7224c813c5fa6024e'
          alt=''
          className='card-img-top cover-art'
        ></img>
        <div className='card-body'>
          <h5 className='card-title song'>Warriors</h5>
          <h6 className='card-subtitle artist mb-2'>Imagine Dragons</h6>
          <h6 className='card-subtitle album mb-2'> </h6>
        </div>
      </div>
      <span className='mt-3 preview text-light'>Listen Preview</span>
      <audio
        className=''
        id='audioPlayer'
        controls
        src='https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/65/07/f5/6507f5c5-dba8-f2d5-d56b-39dbb62a5f60/mzaf_1124211745011045566.plus.aac.p.m4a'
      ></audio>
      <div className='musicLogos text-light'>
        <a
          id='appleLink'
          className=''
          target='_blank'
          rel='noopener noreferrer'
          href=' '
        >
          <img className=' apple' src={apple} alt='Apple Music Link' />
        </a>
        <a id='spotifyLink' rel='noopener noreferrer' target='_blank' href=' '>
          <div className='spotify-bg'>
            <img
              className=' spotify w-75'
              src={spotfiy}
              alt='Spotify Music Link'
            />
          </div>
        </a>
      </div>
      <a
        target='_blank'
        rel='noopener noreferrer'
        id='otherLink'
        className='btn btn-link d-block shadow-none'
        href='https://lis.tn/Warriors'
      >
        Other Music Providers
      </a>
      <button
        className='btn btn-primary shadow-nome text-center mt-3'
        onClick={() => {
          props.changeText(props.normal);
          document.querySelector(".mainText").classList.remove("fade");
          props.showLoadingView();
          document.querySelector(".results").classList.add("d-none");
          document.getElementById("audioPlayer").pause();
          if (
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
          ) {
            props.history.push("/");
            setTimeout(() => {
              props.history.push("/ListenMode/");
            }, 0);
          }
        }}
      >
        Search Again
      </button>
    </div>
  );
}

export default withRouter(ListenResults);
