import * as React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../store/board/board.actions'
import { boardService } from '../../services/board.service'
import { useSelector } from 'react-redux'

export const DatesModal = ({ groupId, taskId, closeModal, className }) => {

    const board = useSelector(state => state.boardModule.board)
    const task = boardService.getTask(board, groupId, taskId)
    const ms = task.dueDate ? task.dueDate.ms : new Date().getTime()
    const date = new Date(ms)

    const cloneDayjs = dayjs().set('year', date.getFullYear())
        .set('month', date.getMonth()).set('date', date.getDate())
        .set('hour', date.getHours()).set('minute', date.getMinutes())

    const [value, setValue] = React.useState(cloneDayjs)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateTask(groupId, taskId, 'dueDate', { ...task.dueDate, ms: new Date(value).getTime() }))
    }, [value])

    return (
        <div className={`dynamic-modal dates-modal ${className ? className : ''}`} onClick={(ev) => ev.stopPropagation()}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue)
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}