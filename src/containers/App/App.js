import React, { Component } from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import { BrowserRouter as Router } from 'react-router-dom'
import Helmet from 'react-helmet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet title="1" />
        <Router>
            <Menu />
            
        </Router>
      </div>
    );
  }
}

export default App;
