import { useState } from "react"

export const GroupActionModal = ({ setIsAddTaskOpen, onRemoveGroup }) => {

    return (
        <div className='group-action-modal'>
            <div>
                list actions
            </div>
            <div className='btns-container'>
                <button className='btn btn-action' onClick={() => setIsAddTaskOpen(true)}>Add card</button>
                <button className='btn btn-action' onClick={onRemoveGroup}>Delete list</button>

            </div>
        </div>
    )
}