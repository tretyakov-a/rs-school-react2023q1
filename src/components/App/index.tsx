import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from '@pages/Homepage';
import About from '@pages/About';
import NotFound from '@pages/NotFound';
import Layout from '@components/Layout';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </>
    );
  }
}
