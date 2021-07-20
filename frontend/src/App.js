import './App.css'
import React, { useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import AuthContextProvider from './contexts/AuthContext';
import DataContextProvider from './contexts/DataContext';
import Auth from './components/pages/auth/Auth'
import ProtectedRoute from './components/pages/routing/ProtectedRoute';
import Navbar from './components/layout/nav/Navbar';
import Products from './components/pages/product/Products';
import Manage from './components/pages/manage/Manage';
import NotFound from './components/layout/NotFound';
import DetailProduct from './components/pages/product/DetailProduct';
import CreateProduct from './components/pages/product/CreateProduct';
import UpdateProduct from './components/pages/product/UpdateProduct';

function App() { 

  const [page, setPage] = useState(1)
  const handleChangPage = (newpage)=>{
    setPage(newpage)
  }
 
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <Router>
        <Navbar />
        <main>
          <Switch>
            <ProtectedRoute exact path='/manage' component={Manage} />
            <ProtectedRoute exact path='/manage/create_product' component={CreateProduct} />
            <ProtectedRoute exact path='/manage/edit_product/:id' component={UpdateProduct} />
            <Route path='/' exact ><Products page={page} handle={handleChangPage}/></Route>
            <Route path="/detail/:id" exact render={props => <DetailProduct {...props}/>} />
            <Route path="/signup" exact render={props => <Auth {...props} authRoute='signup' />} />
            <Route path="/signin" exact render={props => <Auth {...props} authRoute='signin' />} />
            <Route path="/signout" exact render={props => <Auth {...props} authRoute='signout' />} />
            <Route path="*" exact component={NotFound} />
            {/* <Route path='/:page' exact ><Products page={1} /></Route> */}
          </Switch>
        </main>
      </Router>
      </DataContextProvider>
      
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