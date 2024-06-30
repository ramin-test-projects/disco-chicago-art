import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { ArtworkPage } from "./page/Artwork";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <header></header>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artwork/:id" element={<ArtworkPage />} />
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
