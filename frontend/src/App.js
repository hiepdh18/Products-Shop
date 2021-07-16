import './App.css'
import React, { useEffect, useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import Auth from './components/pages/auth/Auth'
import AuthContextProvider from './contexts/AuthContext';
import productApi from './api/productApi';
import Dashboard from './components/pages/dashboard/Dashboard';


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact />
          <Route path="/signup" exact render={props => <Auth {...props} authRoute='signup' />} />
          <Route path="/signin" exact render={props => <Auth {...props} authRoute='signin' />} />
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/manage" exact />
          <Route path="/manage/update" exact />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
