import React from "react";
import withAuth from "./PrivateRoute";

const Cart = () => {
  return <div>cart here</div>;
};

export default withAuth(Cart);
