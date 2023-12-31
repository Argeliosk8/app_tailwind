import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Root from './root';
import { Main } from '../pages/main.jsx';
import { About } from '../pages/about.jsx';
import { Dashboard } from '../pages/dashboard.jsx'
import { LoginPage } from '../pages/login';
import { SubmitPage } from '../pages/submitPage.js';
import ProfilePage from '../pages/profilePage.js';
import { SignUpPage } from '../pages/signup.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route>
        <Route path='/signup' element={<SignUpPage />}/>
      </Route>
      <Route  element={<Root />}> 
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Main />} />
        <Route path="/pool" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/submit' element={<SubmitPage />} />
      </Route>
    </Route>
  )
)


export default router;