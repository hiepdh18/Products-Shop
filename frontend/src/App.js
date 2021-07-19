import './App.css'
import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import AuthContextProvider from './contexts/AuthContext';
import Auth from './components/pages/auth/Auth'
import Dashboard from './components/pages/dashboard/Dashboard';
import ProtectedRoute from './components/pages/routing/ProtectedRoute';


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/signup" exact render={props => <Auth {...props} authRoute='signup' />} />
          <Route path="/signin" exact render={props => <Auth {...props} authRoute='signin' />} />
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

export default App;
