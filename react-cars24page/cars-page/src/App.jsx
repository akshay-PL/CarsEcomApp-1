import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import Main from "./Components/Main.jsx";
import Details from "./Details.jsx";
import Login from "./Components/Login.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import Buynowcheckout from "./Buynowcheckout.jsx";
import Ordersummary from "./Components/Ordersummary.jsx";
import Profileinfo from "./Components/Profileinfo.jsx";
import UpdateCredentials from "./Components/Updatecredentials.jsx"; // Import UpdateCredentials component

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
              <PrivateRoute element={<Ordersummary />} />
            </Layout>
          }
          path="/ordersummary"
        />
        <Route
          element={
            <Layout>
              <PrivateRoute element={<Profileinfo />} />
            </Layout>
          }
          path="/profile"
        />
        <Route // New Route for UpdateCredentials component
          element={
            <Layout>
              <PrivateRoute element={<UpdateCredentials />} />
            </Layout>
          }
          path="/update-credentials"
        />
      </Routes>
    </Router>
  );
};

export default App;
