import React, { useEffect } from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import TodosList from '../components/TodosList';
import axios from 'axios';
import { BASE_URL } from '../assets/baseURL';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

function Main(props) {

// feach the old user data if it exsist is 
    useEffect(() => {
        axios.get(`${BASE_URL}/user_data`)
        .then((res) => {
            res.data.map((data) => {
                if(data.user === props.currentUser.email) {
                   return props.setTodos((currentState) => {
                        return [
                            ...currentState,
                            data
                        ]
                    })
            }else{
                return 0
            }
            })
              
        })
    },[])

// add current user email to todolist and save it in localstorage
    useEffect(() => {
        let newTodo = props.todos.map((val) => {
            return {...val, user:props.currentUser.email}
        })
        let z = JSON.stringify(newTodo)
        localStorage.setItem('todos', z)
    })

// save user todos before logout
     useEffect(() => {
        return () => {
                let r = JSON.parse(localStorage.getItem('todos'))


                //delete the old user data befor logout , then add the new user todos
                axios.get(`${BASE_URL}/user_data`)
                .then((res) => {
                res.data.map((data) => {
                if(data.user === props.currentUser.email){
                    console.log(data);
                    return axios.delete(`${BASE_URL}/user_data/${data.id}`)
                    .then((result) => {
                    })
                }
                else {
                    return 0
                }
            })
        })

        console.log(r);
        r.forEach((val) => {
            val.id = uuid()
            axios.post(`${BASE_URL}/user_data`, val)
            .then((res) => {
            })
            val.id = uuid()
        })
            
        }
    },[])

    return (
        <div className="container">
      <div className='weapper'>
      <div>
        <Link to={'/'}><i className="fa-sharp fa-solid fa-arrow-right-from-bracket">  Logout</i></Link>
        </div>
            <div>
            <Header/>  
            </div>
            <div>
            <Form input={props.input} setInput={props.setInput} todos={props.todos} setTodos={props.setTodos} editTodo={props.editTodo} setEditTodo={props.setEditTodo}/>
            </div>
            <div>
            <TodosList todos={props.todos} setTodos={props.setTodos} setEditTodo={props.setEditTodo} editTodo={props.editTodo}/>
            </div>

            {/* <button type="button" onClick={clickBtn}>ADD</button> */}
        </div>
    </div>
    );
}

export default Main;