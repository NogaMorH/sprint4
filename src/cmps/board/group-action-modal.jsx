import { useState } from "react"
import { useDispatch } from "react-redux"
import { setIsFormAddOpen } from "../../store/board/board.actions"

export const GroupActionModal = ({ groupId }) => {

    const dispatch = useDispatch()

    const openAddForm = () => {
        dispatch(setIsFormAddOpen(groupId, false))
    }

    return (
        <div className='group-action-modal'>
            <div>
                list actions
            </div>
            <div className='btns-container'>
                <button className='btn btn-action' onClick={openAddForm}>Add card</button>
            </div>
        </div>
    )
}