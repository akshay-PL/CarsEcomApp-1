// In your App.js file
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Components/Main.jsx";
import Details from "./Details.jsx";
import Login from "./Components/Login.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import Buynowcheckout from "./Buynowcheckout.jsx";
import Profileinfo from "./Components/Profileinfo.jsx";

const PrivateRoute = ({ element }) => {
  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <Layout>
              <PrivateRoute element={<Main />} />
            </Layout>
          }
          path="/main/*"
        />
        <Route
          element={
            <Layout>
              <PrivateRoute element={<About />} />
            </Layout>
          }
          path="/about"
        />
        <Route
          element={
            <Layout>
              <PrivateRoute element={<Contact />} />
            </Layout>
          }
          path="/contact"
        />
        <Route
          element={
            <Layout>
              <PrivateRoute element={<Details />} />
            </Layout>
          }
          path="/main/details/:id"
        />
        <Route
          element={
            <Layout>
              <PrivateRoute element={<Buynowcheckout />} />
            </Layout>
          }
          path="/buynowcheckout/:id"
        />
        <Route
          element={
            <Layout>
              <PrivateRoute element={<Profileinfo />} />
            </Layout>
          }
          path="/profile"
        />
      </Routes>
    </Router>
  );
};

export default App;
