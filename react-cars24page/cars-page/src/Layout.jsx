import React from 'react';
import Navbar from './Components/Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
