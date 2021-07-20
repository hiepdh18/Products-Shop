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
import Navbar from './components/layout/nav/Navbar';
import Products from './components/pages/product/Products';
import Manage from './components/pages/manage/Manage';


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path='/' exact ><Dashboard /></Route>
            <Route path='/product/' ><Products /></Route>
            <Route path='/product/:page' ><Products/></Route>

            <Route path='/manage' exact ><Manage /></Route>

            <Route path="/signup" exact render={props => <Auth {...props} authRoute='signup' />} />
            <Route path="/signin" exact render={props => <Auth {...props} authRoute='signin' />} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
        </main>



      </Router>
    </AuthContextProvider>
  )
}

export default App;

// <Router>
//   <Switch>
//     <Route path='/' exact component={Dashboard} />
//     <Route path='/product' exact component={Products} />
//     <Route path="/signup" exact render={props => <Auth {...props} authRoute='signup' />} />
//     <Route path="/signin" exact render={props => <Auth {...props} authRoute='signin' />} />
//     <ProtectedRoute exact path='/dashboard' component={Dashboard} />
//   </Switch>
// </Router>