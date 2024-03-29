import './Container.css';

// import React, { useState } from 'react';


function Container({ children }) {

  return (
    <div className="container-app">
      {children}
    </div>

  );
}

export default Container;