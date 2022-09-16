import { useState } from 'react'
import { AddTaskForm } from './add-task-form'
import { BoardMenu } from './board-menu'
import { GroupActionModal } from './group-action-modal'
import { TaskList } from './task-list'
import { removeGroup } from "../../store/board/board.actions"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'



export const GroupPreview = ({ group }) => {

    // useEffect(() => {
    //     console.log('group:', group)
    // }, [group])

    const dispatch = useDispatch()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

    const openEditModal = (ev) => {
        ev.stopPropagation()
        setIsEditModalOpen(true)
        document.addEventListener('click', closeEditModal)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
        document.removeEventListener('click', closeEditModal)
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
                <button className='btn' onClick={openEditModal}>...</button>
            </div>
            {isEditModalOpen && <GroupActionModal setIsAddTaskOpen={setIsAddTaskOpen} onRemoveGroup={onRemoveGroup} />}
            {isAddTaskOpen && <AddTaskForm setIsAddTaskOpen={setIsAddTaskOpen} groupId={group.id} />}
            <TaskList tasks={group.tasks} />


        </div>
    )
}