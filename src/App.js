import React from "react";
import "./App.css";
import Main from "./pages/main/main";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SingingMode from "./pages/SingingMode/SingingMode";
import LyricsMode from "./pages/LyricsMode/LyricsMode";
import QuestMode from "./pages/QuestMode/QuestMode";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };

    this.constraints = {
      audio: true,
      video: false,
    };
  }

  // loadStream = () => {
  //   let promise = navigator.mediaDevices.getUserMedia(this.constraints);
  //   return promise;
  // };
  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={Main} />
          <Route exact path='/SingingMode/' component={SingingMode} />
          <Route exact path='/LyricsMode/' component={LyricsMode} />
          <Route exact path='/QuestMode/' component={QuestMode} />
        </div>
      </Router>
    );
  }
}

export default App;
