import Navbar from './components/Navbar';
import React from "react";
import './App.css';

function App() {
  return (
    <div className="Page">
    <div className="App">
      <a href="/">
        <h1>Race Organization</h1>
      </a>
      <Navbar />
    </div>
    </div>
  );
}

export default App;
