// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import Main from './Components/Main.jsx';
import Details from './Details.jsx';
import Login from './Components/Login.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import Buynowcheckout from './Buynowcheckout.jsx'; // Import CheckoutPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/main/*"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/main/details/:id" // Updated path for Details component
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
        <Route path="/buynowcheckout/:id" element={<Layout><Buynowcheckout /></Layout>} /> 
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
