import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalGroupId } from '../../store/board/board.actions'
import { FormAdd } from './form-add'
import { GroupActionModal } from './group-action-modal'
import { TaskList } from './task-list'
import { removeGroup } from "../../store/board/board.actions"

export const GroupPreview = ({ group }) => {

    // useEffect(() => {
    //     console.log('group:', group)
    // }, [group])

    const dispatch = useDispatch()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const formAdd = useSelector(state => state.systemModule.formAdd)
    const modalGroupId = useSelector(state => state.systemModule.modalGroupId)
    // const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

    // useEffect(() => {
    //     isFormAddOpen()
    // }, [formAdd])

    const openGroupModal = (ev) => {
        ev.stopPropagation()
        dispatch(setModalGroupId(group.id))
        document.addEventListener('click', closeGroupModal)
    }

    const closeGroupModal = () => {
        dispatch(setModalGroupId(null))
        document.removeEventListener('click', closeGroupModal)
    }

    const onRemoveGroup = () => {
        dispatch(removeGroup(group.id))
    }

    return (
        <div className='group-preview flex column'>
            <div className='group-title-container'>
                <div className='group-title'>
                    <h3>{group.title}</h3>
                </div>
                <button className='btn' onClick={openGroupModal}>...</button>
            </div>
            {modalGroupId === group.id && <GroupActionModal groupId={group.id} onRemoveGroup={onRemoveGroup} />}
            {formAdd.groupId === group.id && <FormAdd groupId={group.id} />}
            <TaskList tasks={group.tasks} />
        </div>
    )
}