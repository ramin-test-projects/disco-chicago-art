import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Page/Home";
import { ArtworkPage } from "./Page/Artwork";

function App() {
  return (
    <>
      <header></header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artwork/:id" element={<ArtworkPage />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
