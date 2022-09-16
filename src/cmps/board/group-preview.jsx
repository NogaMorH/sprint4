import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormAdd } from './form-add'
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

    const onRemoveGroup = () => {
        dispatch(removeGroup(group.id))
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
            {isEditModalOpen && <GroupActionModal groupId={group.id} onRemoveGroup={onRemoveGroup} />}
            {formAdd.groupId === group.id && <FormAdd groupId={group.id} />}
            <TaskList tasks={group.tasks} />


        </div>
    )
}