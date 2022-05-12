import React from 'react';
import { Outlet, Routes, Route } from "react-router-dom";

import './App.css';
import Podcasts from './app/podcasts';
import PodcastEpisodes from './app/podcast/[slug]';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Podcasts />} />
        <Route path="/podcast/:slug" element={<PodcastEpisodes  />} />
      </Route>
    </Routes>
  );
}

export default App;

function Layout() {
  return (
    <>
      <h1>Podcasts</h1>
      <Outlet />
    </>
  );
}
