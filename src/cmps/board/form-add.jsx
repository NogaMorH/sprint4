import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { saveTask } from '../../store/board/board.actions'
import { saveGroup } from '../../store/board/board.actions'

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
    }

    const addGroup = (ev) => {
        ev.preventDefault()
        dispatch(saveGroup(form))
    }

    return (
        formAdd.isAddGroup
            ? <form className='form-add' onSubmit={addGroup}>
                <textarea placeholder='Enter list title...' className='group-title'
                    name='title' onChange={handleChange} value={form.title} autoFocus>
                </textarea>
                <button className='btn'>Add list</button>
                <button>X</button>
            </form>
            : <form className='form-add' onSubmit={addTask}>
                <textarea placeholder='Enter a title for this card...' className='card-title'
                    name='title' onChange={handleChange} value={form.title} autoFocus>
                </textarea>
                <button>Add</button>
            </form>
    )

}


