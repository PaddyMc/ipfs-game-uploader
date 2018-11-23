import React, { Component } from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import { HashRouter as Router } from 'react-router-dom'
import Helmet from 'react-helmet';
import ParticlesBackground from '../../components/ParticlesBackground/ParticlesBackground';

class App extends Component {
  render() {
    return (
      <div>
      <ParticlesBackground>
      </ParticlesBackground>
      <div className="App">
        <Helmet title="Game Uploader" />
          <Router>
              <Menu />
          </Router>
      </div>
      </div>
      
    );
  }
}

export default App;
