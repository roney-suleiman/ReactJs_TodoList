import React, { useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from "../assets/baseURL";
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {


  const navigate = useNavigate()

    const  setValues = (e) => {
      props.setUser((currentState) =>{
         return {
        ...currentState,
        [e.target.name]: e.target.value
      }
    })
  }

  const emptyFilds = () => {
    props.setUser({
      email: '',
      password: ''
    })
}

const login = (e) => {
  e.preventDefault()


  axios.get(`${BASE_URL}/users`)
  .then((res) => {
    const loginUser = res.data.find((user) => {
      return (user.email === props.user.email && user.password === props.user.password)
    })
      if(loginUser) {
        emptyFilds()
        navigate('/main')
        props.setCurrentUser(loginUser)

      }else {
        emptyFilds()
        alert('invalid username or password')
      }
  })
}
   

    return (
        <div className="container">
          <div className="weapper">
                <h1>LOGIN</h1>
                <form onSubmit={login}>
                    <div className="user">
                                  <i className="icon-1 fa-solid fa-right-to-bracket"></i>
                                  
                                  <input className="user_input" type="email" name="email" value={props.user.email} placeholder="E_Mail" onChange={setValues} required/>
                                  <br/>
                                  <input className="user_input" type="password" name="password" value={props.user.password} placeholder="Password" onChange={setValues} required/>
                                  <br/>
                                    <button className="btn-login" type="submit">Login</button>
                                  
                      </div>
                      <Link className="go_to" to={'/signup'}>to Sign up &nbsp;&nbsp;<i className="fa-solid fa-user-plus"></i> </Link>
                </form>
          </div>
        </div>
      );
}

export default Login;












