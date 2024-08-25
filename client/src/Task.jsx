import React, { useState } from 'react';
import TaskModal from './TaskModal';
import trash from './icons/trash-can.png';




function Task( {taskName, task, onCheck, onDelete} ) {

    // Back-end URI
    const apiUri = REACT_APP_BACKEND;

    // task modal function
    const [modalState, setModalState] = useState(false);

    // stop propogation at delete button:
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    
    // description update function
    const descUpdate = async (task) => {
        
        const taskId = task.id

        // update the backend
        fetch(`${apiUri}/api/tasks/desc/${taskId}`, {method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
        })
        .then(response => {
            if (!response.ok) {
                // catch errors in response
                throw new Error('Network response was not ok (delete)')
            }
        })
        // catch erros
        .catch(error => console.error('Error updating description: ', error));
    }



    return(

        <>
        <div 
            className='task'
            onClick={() => setModalState(!modalState)}
        >
            <div className='task-check'>
                <button 
                    className='checkbox'
                    onClick={() => onCheck(task)}
                    
                >
                    <p className='checkmark'>✔</p>
                </button>
                
            </div>
            <div className='task-description'>
                <h3>{taskName}</h3>
            </div>
            <div className='delete-button-div'>
                <button 
                    className='delete-button'
                    onClick={(e) => {
                                onDelete(taskName.id);
                                stopPropagation(e);
                            }}>
                        <img 
                            className="trash-image"
                            src={trash}/>
                </button>
            </div>
        </div>
        {modalState ? 
            <TaskModal
                changeState={setModalState}
                taskObj={task}
                handleUpdate={descUpdate}
            /> : null}
        </>
    )

};


export default Task