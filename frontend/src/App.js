import './App.css'
import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import Auth from './components/pages/auth/Auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact />
        <Route path="/signup" exact render={props => <Auth {...props} authRoute='signup' />} />
        <Route path="/signin" exact render={props => <Auth {...props} authRoute='signin' />} />
        <Route path="/product" exact />
        <Route path="/manage" exact />
        <Route path="/manage/update" exact />
      </Switch>
    </Router>
  );
}

export default App;
