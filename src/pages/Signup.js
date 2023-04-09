import axios from "axios";
import { BASE_URL } from "../assets/baseURL";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Signup(props) {

  const navigate = useNavigate()

const  setValues = (e) => {
      props.setUser((currentState) =>{
         return {
        ...currentState,
        [e.target.name]: e.target.value
      }
    })
}

// useEffect(() => {
  
// })


const signup = (e) => {
  e.preventDefault();

  axios.get(`${BASE_URL}/users`)
  .then((res) => {
    const foundUser = res.data.find((user) => {
      return user.email === props.user.email
    })
    if(foundUser){
      alert('You have Alredy rigisterd')
       emptyFilds();
    }else {
        axios.post(`${BASE_URL}/users`, props.user)
      .then((res) => {
        emptyFilds();
        navigate('/main')
        props.setCurrentUser(props.user)
      })
    }
  })

}

const emptyFilds = () => {
    props.setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
}
  return (
    <div className="container">
      <div className="weapper">
        <h1>SIGNUP</h1>
            <form onSubmit={signup}>
                  <div className="user">
                              <i className="icon-1 fa-solid fa-user-plus"></i>
                              <input className="user_input" type="text" name="firstName" value={props.user.firstName} placeholder="First Name" onChange={setValues} required/>
                              <br/>
                              <input className="user_input" type="text" name="lastName" value={props.user.lastName} placeholder="Last Name" onChange={setValues} required/>
                              <br/>
                              <input className="user_input" type="email" name="email" value={props.user.email} placeholder="E_Mail" onChange={setValues} required/>
                              <br/>
                              <input className="user_input" type="password" name="password" value={props.user.password} placeholder="Password" onChange={setValues} required/>
                              <br/>
                                <button className="btn-signup" type="submit">Signup</button>
                              
                  </div> 
                  <Link className="go_to" to={'/'}>Are You rigisterd !?  To Login &nbsp;&nbsp; <i className="fa-solid fa-right-to-bracket"></i></Link>
            </form>
      </div>
    </div>
  );
}

export default Signup;
