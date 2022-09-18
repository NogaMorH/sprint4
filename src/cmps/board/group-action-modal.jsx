import { useState } from "react"
import { useDispatch } from "react-redux"
import { setIsFormAddOpen } from "../../store/board/board.actions"

export const GroupActionModal = ({ groupId, onRemoveGroup }) => {

    const dispatch = useDispatch()

    const openAddForm = () => {
        dispatch(setIsFormAddOpen(groupId, false))
    }

    return (
        <div className='group-action-modal'>
            <div className="action-modal-title">
                List actions
            </div>
            <div className='btns-container'>
                <button className='btn btn-action' onClick={openAddForm}>Add card</button>
                <button className='btn btn-action' onClick={onRemoveGroup}>Delete list</button>
            </div>
        </div>
    )
}