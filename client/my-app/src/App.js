import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Popup from 'react-popup';

// Register the plugin
Popup.registerPlugin('alert', function (message) {
  alert(message);
});

function App() {
  return (

    <div className="App">
      <header>
        <Header />
      </header>
      <Outlet />
    </div>
  );

}

export default App;
