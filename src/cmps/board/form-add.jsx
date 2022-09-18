import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { saveTask, setIsFormAddOpen, saveGroup } from '../../store/board/board.actions'

export const FormAdd = ({ groupId }) => {

    const formAdd = useSelector(state => state.systemModule.formAdd)
    const dispatch = useDispatch()
    const [form, handleChange] = useForm({ title: '' })

    useEffect(() => {
        console.log('task:', form)
    }, [form])

    const addTask = (ev) => {
        ev.preventDefault()
        console.log('task:', form)
        dispatch(saveTask(groupId, form))
        closeForm()
    }

    const addGroup = (ev) => {
        ev.preventDefault()
        dispatch(saveGroup(form))
        closeForm()
    }

    const closeForm = () => {
        dispatch(setIsFormAddOpen(null, false))
    }

    return (
        <form className='form-add' onSubmit={formAdd.isAddGroup ? addGroup : addTask}>
            <div className='title'>
                <textarea placeholder={formAdd.isAddGroup ? 'Enter list title...' : 'Enter a title for this card...'} className='group-title'
                    name='title' onChange={handleChange} value={form.title} autoFocus />
                <textarea />
            </div>
            <button className='btn'>{formAdd.isAddGroup ? 'Add list' : 'Add card'}</button>
            <button onClick={closeForm}>X</button>
        </form >
    )
}


