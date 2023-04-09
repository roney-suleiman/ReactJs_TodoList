import React from 'react';

function TodosList(props) {

    const handleDelete = (id) => {
        let NEW_ARRAY = props.todos.filter((todo) => {
            return id !== todo.id
        })
        props.setTodos(NEW_ARRAY)
    }

    const handleUpdate = (id) => {
       props.setTodos(props.todos.map((item) => {
        if(id === item.id) {
            return {...item, completed:!item.completed}
        }
        return item
       }))
    }

    const handleEdit = (id) => {
        const findTodo = props.todos.find((todoToUpdate) => todoToUpdate.id === id )
        props.setEditTodo(findTodo)
    }

    return (
        <div>
            {
                props.todos.map((todo) => {
                    return(
                        <li className='list-item' key={todo.id}>
                            <input type="text" value={todo.title} className={`list ${todo.completed ? "complete" : "" }`} onChange={(e) => {e.preventDefault()}}/>
                            <div className='btns'>

                                <button className='button-complete task-button'>
                                <i className="fa-solid fa-circle-check"  onClick={() => {handleUpdate(todo.id)}}></i>
                                </button>

                                <button className='button-edit task-button'>
                                <i className="fa-solid fa-pen" onClick={() => {handleEdit(todo.id)}}></i>
                                </button>

                                <button className='button-delete task-button'>
                                <i className="fa-solid fa-trash-can" onClick={() => {handleDelete(todo.id)}}></i>
                                </button>

                            </div>
                        </li>
                    )
                })
            }
        </div>
    );
}

export default TodosList;