import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Support } from "./scenes/scenes";

const App = (props) => {
  useEffect(() => {}, []);
  return (
    <div style={{ background: `#171C28` }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
