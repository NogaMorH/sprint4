import { useState } from "react"

export const TaskEditModal = ({ setIsAddTaskOpen }) => {

    return (
        <div>
            <div>
                list actions
            </div>
            <div className='btns-container'>
                <button className='btn btn-action' onClick={() => setIsAddTaskOpen(true)}>Add card</button>
            </div>
        </div>
    )
}