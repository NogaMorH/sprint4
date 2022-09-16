import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { updateBoard } from '../../store/board/board.actions'

export const AddTaskForm = ({ setIsAddTaskOpen }) => {

    const dispatch = useDispatch()
    const [fields, handleChange] = useForm({ title: '' })

    useEffect(() => {
        console.log('fields:', fields)
    }, [fields])

    const addTask = (ev) => {
        ev.preventDefault()
        console.log('fields:', fields)
        // dispatch(updateBoard())
    }

    return (
        <form className='add-task-form' onSubmit={addTask}>
            <textarea placeholder='Enter a title for this card...' className='card-title'
                name='title' onChange={handleChange}>
            </textarea>
            <button>Add</button>
            <button onClick={() => setIsAddTaskOpen(false)}>x</button>
        </form>
    )
}