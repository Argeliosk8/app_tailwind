import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Root from './root';
import { Main } from '../pages/main.jsx';
import { About } from '../pages/about.jsx';
import { Dashboard } from '../pages/dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  element={<Root />}> 
      <Route path="/" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
)

export default router;