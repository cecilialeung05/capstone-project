import React from 'react';
import Navbar from './Navbar';
import './Container.scss'; 

const Container = ({ children, theme, toggleTheme }) => {
  return (
    <div className={`app-container ${theme}`}> {/* Apply theme class */}
        <div className="layout-container"> {/* Apply the new class */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="container">
      <div className="content-wrapper">  {/* Add a content wrapper */}
        {children}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Container;