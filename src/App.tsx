import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { ArtworkPage } from "./page/Artwork";
import { Provider } from "react-redux";
import { store } from "./store";
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <Provider store={store}>
      <header></header>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/details/:id"
            element={
              <MainLayout>
                <ArtworkPage />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
