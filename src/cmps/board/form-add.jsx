import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { saveTask, setIsFormAddOpen } from '../../store/board/board.actions'
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
        formAdd.isAddGroup
            ? <form className='form-add' onSubmit={addGroup}>
                <div className='title'>
                    <input placeholder='Enter list title...' className='group-title'
                        name='title' onChange={handleChange} value={form.title} autoFocus />
                </div>
                <button className='btn'>Add list</button>
                <button>X</button>
            </form>
            : <form className='form-add' onSubmit={addTask}>
                <textarea placeholder='Enter a title for this card...' className='card-title'
                    name='title' onChange={handleChange} value={form.title} autoFocus>
                </textarea>
                <button onClick={addTask} className='btn btn-primary-board'>Add card</button>
            </form>
    )

}


