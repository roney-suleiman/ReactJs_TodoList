import './App.css';
import uuid from 'react-uuid';
import React, {useState} from 'react';
import Main from './pages/Main';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
function App() {

  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const[user, setUser] = useState( {
      id: uuid(),
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  )
  const [currentUser, setCurrentUser] = useState({})

  return (

    <div>
      <Routes>
          <Route path="/main" element={<Main currentUser={currentUser} setCurrentUser={setCurrentUser} input={input} setInput={setInput} todos={todos} setTodos={setTodos} editTodo={editTodo} setEditTodo={setEditTodo} />}/>
          <Route path="/signup" element={<Signup currentUser={currentUser} setCurrentUser={setCurrentUser} user={user} setUser={setUser}/>}/>
          <Route path="/" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} user={user} setUser={setUser}/>}/>
          <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
