import React, { Component } from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Menu />
            
        </Router>
      </div>
    );
  }
}

export default App;
