import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormAdd } from './form-add'
import { GroupActionModal } from './group-action-modal'
import { TaskList } from './task-list'

export const GroupPreview = ({ group }) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const formAdd = useSelector(state => state.systemModule.formAdd)
    // const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

    // useEffect(() => {
    //     isFormAddOpen()
    // }, [formAdd])

    const openEditModal = (ev) => {
        ev.stopPropagation()
        setIsEditModalOpen(true)
        document.addEventListener('click', closeEditModal)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
        document.removeEventListener('click', closeEditModal)
    }

    const isFormAddOpen = () => {
        console.log('formAdd:', formAdd)
        // console.log('formAdd.groupId:', formAdd.groupId)
        console.log('group.id:', group.id)
        return formAdd.groupId === group.id
    }

    return (
        <div className='group-preview flex column'>
            <div className='group-title-container'>
                <div className='group-title'>
                    <h3>{group.title}</h3>
                </div>
                <button className='btn' onClick={openEditModal}>...</button>
            </div>
            {isEditModalOpen && <GroupActionModal groupId={group.id} />}
            {formAdd.groupId === group.id && <FormAdd groupId={group.id} />}
            <TaskList tasks={group.tasks} />

        </div>
    )
}