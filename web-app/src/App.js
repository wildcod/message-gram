import React, { Component } from 'react';
import Main from './pages/main/main'
import {BrowserRouter} from 'react-router-dom'
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>   
        <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
