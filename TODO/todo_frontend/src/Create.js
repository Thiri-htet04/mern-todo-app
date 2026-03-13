import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState('');

    const createTask = () => {

        const trimmedTask = task.trim();

        if (!trimmedTask) {
            console.log("Task is empty");
            return;
        }

        axios.post('/add', { task: trimmedTask })
            .then(result => {
                console.log(result.data);
                setTask('');
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <h1>Todo List</h1>
            <div className='create-form'>
                <input
                    type='text'
                    placeholder='Enter a task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <button onClick={createTask}>ADD</button>
            </div>
        </main>
    );
};

export default Create;