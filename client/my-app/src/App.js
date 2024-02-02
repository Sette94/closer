import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';


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
