import './App.css';
// import LoginForm from './mainpages/Login';
import React, {  useEffect } from 'react';
import axios from 'axios'
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'



function App() {
  // const adminUser = {
  //   email: "admin@gmail.com",
  //   password: "admin.123"
  // }

  // const [user, setUser] = useState({ name: "", email: "" })
  // const [error, setError] = useState("")

  // const Login = details => {
  //   console.log(details)
  // }

  // const Logout = () => {
  //   console.log("Logout")

  // }

  useEffect(()=>{
    const getType = async () => {
      const types = await axios.get('/type')
      console.log(types)
    }
    getType()
  },[])

  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact component={Products} />
        <Route path="/detail/:id" exact component={DetailProduct} />
        <Route path="/login" exact component={isLogged ? NotFound : Login} />
        <Route path="/register" exact component={isLogged ? NotFound : Register} />
        <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
        <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
        <Route path="/edit_product/:id" exact component={isAdmin ? UpdateProduct : NotFound} />
        <Route path="*" exact component={NotFound} /> */}
      </Switch>
    </Router>
  );
}

export default App;
