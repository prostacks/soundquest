import React from "react";
import "./App.css";
import Main from "./pages/main/main";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SingingMode from "./pages/SingingMode/SingingMode";
import LyricsMode from "./pages/LyricsMode/LyricsMode";
import QuestMode from "./pages/QuestMode/QuestMode";
import LandingPage from "./pages/landing/LandingPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/ListenMode/' component={Main} />
          <Route exact path='/SingingMode/' component={SingingMode} />
          <Route exact path='/LyricsMode/' component={LyricsMode} />
          <Route exact path='/QuestMode/' component={QuestMode} />
        </div>
      </Router>
    );
  }
}

export default App;
