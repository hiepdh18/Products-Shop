import './App.css';
import LoginForm from './components/LoginForm';
import React, { useState } from 'react';

function App() {
  const adminUser = {
    email: "admin@gmail.com",
    password: "admin.123"
  }

  const [user, setUser] = useState({ name: "", email: "" })
  const [error, setError] = useState("")

  const Login = details => {
    console.log(details)
  }

  const Logout = () => {
    console.log("Logout")
    
  }
  return (
    <div className="App">

      <LoginForm></LoginForm>
    </div>
  );
}

export default App;
