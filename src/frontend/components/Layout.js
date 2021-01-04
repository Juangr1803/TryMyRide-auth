// React
import React from 'react';
// Components
import Header from './Header';

//---------------------------------------------------//

// Layout
const Layout = ({ children }) => (
  <div className="App">
    <Header />
    {children}
  </div>
);

export default Layout;
