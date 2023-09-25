import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Purchase,
  Account,
  Reviews,
  Home,
  Login,
  Support,
  CreditsExplore,
  Collection,
  Features,
} from "./scenes/scenes";
import AOS from "aos";

import { PaymentSuccess, Footer } from "./components/components";

const App = (props) => {
  useEffect(() => {
    //localStorage.setItem("user", JSON.stringify(null));
    //localStorage.setItem("token", JSON.stringify(null));
    //localStorage.removeItem("account-created");

    /* Whenever returning to home page, we want to scroll to the top of the screen */
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div style={{ background: `#171C28`, overflow: "hidden" }}>
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
          <Route
            path="/credits"
            element={
              <>
                <CreditsExplore />
              </>
            }
          />

          <Route path="/collection" element={<Collection />} />
          <Route path="/features/:feature" element={<Features />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
