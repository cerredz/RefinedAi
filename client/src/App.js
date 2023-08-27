import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Purchase,
  Account,
  Reviews,
  Home,
  Login,
  Support,
} from "./scenes/scenes";

import { PaymentSuccess } from "./components/components";

const App = (props) => {
  useEffect(() => {
    //localStorage.setItem("user", JSON.stringify(null));
    //localStorage.setItem("token", JSON.stringify(null));
    //localStorage.removeItem("account-created");
  }, []);
  return (
    <div style={{ background: `#171C28` }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/account/:username" element={<Account />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route
            path="/success/:credits/:paymentID/:price/:type"
            element={<PaymentSuccess />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
