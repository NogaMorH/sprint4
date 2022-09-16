import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { saveTask } from '../../store/board/board.actions'

export const FormAdd = ({ groupId }) => {

    const dispatch = useDispatch()
    const [task, handleChange] = useForm({ title: '' })

    useEffect(() => {
        console.log('task:', task)
    }, [task])

    const addTask = (ev) => {
        ev.preventDefault()
        console.log('task:', task)
        dispatch(saveTask(groupId, task))
    }

    return (
        <form className='form-add' onSubmit={addTask}>
            <textarea placeholder='Enter a title for this card...' className='card-title'
                name='title' onChange={handleChange} value={task.title}>
            </textarea>
            <button>Add</button>
            {/* <button onClick={() => setIsAddTaskOpen(false)}>x</button> */}
        </form>
    )
}