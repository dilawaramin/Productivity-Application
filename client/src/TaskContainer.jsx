import Task from "./Task";
import React, {useEffect, useState} from 'react';
import Addtask from "./Addtask";
import TaskComplete from "./TaskComplete";
import TaskModal from './TaskModal';


function TaskContainer() {

    // Back-end URI
    const apiUri = process.env.REACT_APP_BACKEND;

    // list of tasks
    const [taskList, setTaskList] = useState([]);

    // complete task function
    const completeTask = async (task) => {

        const taskId = task.id

        // update the backend
        fetch(`${apiUri}/api/tasks/${taskId}`, {method: 'PATCH'})
        .then(response => {
            if (!response.ok) {
                // catch errors in response
                throw new Error('Network response was not ok (delete)')
            }

        // update client side once backend update is successful
        setTaskList(prevTask => {

            // find the passed task and change completed property 
            return prevTask.map(t => {
                if (t.id === task.id) {
                    t.completed = true;
                    return {...t};
                }
                return t;
                })
            })
        })

        // catch errors
        .catch(error => console.error('Error updating task: ', error));
    }


    // delete function
    const deleteTask = async (taskId) => {
        // request to server first
        fetch(`${apiUri}/api/tasks/${taskId}`, {method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                // catch errors in response
                throw new Error('Network response was not ok (delete)')
            }
        // update local list if server deletion success
        setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId))
        })
        // catch errors
        .catch(error => console.error('Error deleting task: ', error));
    };


    // Populate list of tasks from server
    useEffect(() => {
        fetch(`${apiUri}/api/tasks`).then(
            response => {
                console.log(apiUri)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            }
        ).then(
            data => {
                if (Array.isArray(data) || data === null) {
                    setTaskList(data)
                } else {
                    throw new Error('Data is not an array')
                }
            }
        )
        .catch(error => {
            console.error("Error fetching tasks: ", error);
            setTaskList([]);
        })
    }, [])

    
    return(
        <section className='task-container'>

            <div className='task-container-header'>
                <h2 className='sub-heading-text'>My Tasks:</h2>
            </div>     
 
            {taskList.map((taskname) => {
                if (taskname.completed === false) {
                    return (
                    <Task 
                        key={taskname.id} 
                        taskName={taskname.title}
                        task={taskname} 
                        onCheck={() => completeTask(taskname)}
                        onDelete={() => deleteTask(taskname.id)}
                        
                    />
                    )
                }}
            )}



            <Addtask 
                addTask={setTaskList} 
                taskList={taskList}/>

            <div className='task-container-header'>
                <h2 className='sub-heading-text'>Completed Tasks:</h2>
            </div>     
            
            {taskList.map((taskname) => {
                if (taskname.completed === true) {
                    return (
                    <TaskComplete 
                    key={taskname.id} 
                    taskName={taskname.title}
                    onDelete={() => deleteTask(taskname.id)}
                />
                    )
                }}
            )}


        </section>
    );
}

export default TaskContainer