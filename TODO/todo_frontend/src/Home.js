import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    const fetchTodos = () => {
        axios.get('/get')
            .then(result => {
                console.log('GET response:', result.data);
                setTodos(result.data);
            })
            .catch(err => console.log('GET error:', err));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const edit = (id) => {
        axios.put(`/edit/${id}`)
            .then(result => {
                console.log('Edit response:', result.data);
                fetchTodos();
            })
            .catch(err => console.log(err));
    };

    const Update = (id, updatedTask) => {
        const trimmedTask = updatedTask.trim();

        if (!trimmedTask) {
            console.log('Updated task is empty');
            return;
        }

        axios.put(`/update/${id}`, { task: trimmedTask })
            .then(result => {
                console.log('Update response:', result.data);
                setTaskid('');
                setUpdatetask('');
                fetchTodos();
            })
            .catch(err => console.log(err));
    };

    const Hdelete = (id) => {
        axios.delete(`/delete/${id}`)
            .then(result => {
                console.log('Delete response:', result.data);
                fetchTodos();
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <Create fetchTodos={fetchTodos} />
            {
                todos.length === 0 ? (
                    <div className='task'>No tasks found</div>
                ) : (
                    todos.map((todo) => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox'>
                                {todo.done ? (
                                    <BsFillCheckCircleFill className='icon' onClick={() => edit(todo._id)} />
                                ) : (
                                    <BsCircleFill className='icon' onClick={() => edit(todo._id)} />
                                )}

                                {taskid === todo._id ? (
                                    <input
                                        type='text'
                                        value={updatetask}
                                        onChange={e => setUpdatetask(e.target.value)}
                                    />
                                ) : (
                                    <p className={todo.done ? 'through' : 'normal'}>
                                        {todo.task}
                                    </p>
                                )}
                            </div>

                            <div>
                                <span>
                                    <BsPencil
                                        className='icon'
                                        onClick={() => {
                                            if (taskid === todo._id) {
                                                Update(todo._id, updatetask);
                                            } else {
                                                setTaskid(todo._id);
                                                setUpdatetask(todo.task);
                                            }
                                        }}
                                    />
                                    <BsFillTrashFill
                                        className='icon'
                                        onClick={() => Hdelete(todo._id)}
                                    />
                                </span>
                            </div>
                        </div>
                    ))
                )
            }
        </main>
    );
};

export default Home;