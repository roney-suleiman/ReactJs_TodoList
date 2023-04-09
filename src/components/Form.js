import React, { useEffect } from 'react';
import uuid from 'react-uuid';
function Form(props) {

    const updateTodo = (title, id, completed) => {
        const newTodo = props.todos.map((todo) => {
          return  todo.id === id ? {title, id, completed} : todo
        }) 
        props.setTodos(newTodo)
        props.setEditTodo('')
    }

    useEffect(() => {
        if(props.editTodo) {
            props.setInput(props.editTodo.title)
        }else {
            props.setInput('')
        }   
    }, [props.setInput, props.editTodo])

    const inputChange = (e) => {
        props.setInput(e.target.value)
    }

    const onFormularSubmit = (e) => {
        e.preventDefault();
        if(!props.editTodo) {
            props.setTodos([...props.todos, {id: uuid(), title: props.input, completed: false}])
            props.setInput('');
        } else {
            updateTodo(props.input, props.editTodo.id, props.editTodo.completed);
        }
        
    }

    return (
            <form onSubmit={onFormularSubmit}>
            <input type="text" className='task-input' name="" value={props.input} placeholder='Enter a Task' onChange={inputChange}/>
            <button className='button-add' type="submit">{props.editTodo ? 'OK' : 'Add'}</button>
            </form>
    )

    
}

export default Form;