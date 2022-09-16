import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalGroupId } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { GroupActionModal } from './group-action-modal'
import { TaskList } from './task-list'

export const GroupPreview = ({ group }) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const modalGroupId = useSelector(state => state.systemModule.modalGroupId)
    const dispatch = useDispatch()
    // const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

    // useEffect(() => {
    //     isFormAddOpen()
    // }, [formAdd])

    const openGroupModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalGroupId(group.id))
        // setIsEditModalOpen(true)
        document.addEventListener('click', closeGroupModal)
    }

    const closeGroupModal = () => {
        dispatch(setModalGroupId(null))
        // setIsEditModalOpen(false)
        document.removeEventListener('click', closeGroupModal)
    }

    return (
        <div className='group-preview flex column'>
            <div className='group-title-container'>
                <div className='group-title'>
                    <h3>{group.title}</h3>
                </div>
                <button className='btn' onClick={openGroupModal}>...</button>
            </div>
            {modalGroupId === group.id && <GroupActionModal groupId={group.id} />}
            {formAdd.groupId === group.id && <FormAdd groupId={group.id} />}
            <TaskList tasks={group.tasks} />
        </div>
    )
}