import * as React from 'react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useEffect } from 'react'

export const DatesModal = ({ groupId, taskId, closeModal, className }) => {

    // const [value, setValue] = React.useState(dayjs())
    // console.log('value:', value.$d)

    // useEffect(()=> {

    // }, [value])

    // return (
    //     <div onClick={(ev) => ev.stopPropagation()}>
    //         <LocalizationProvider dateAdapter={AdapterDayjs}>
    //             <Stack spacing={3}>
    //                 <DatePicker
    //                     openTo="year"
    //                     views={['year', 'month', 'day']}
    //                     label="Year, month and date"
    //                     value={value}
    //                     onChange={(newValue) => {
    //                         setValue(newValue)
    //                     }}
    //                     renderInput={(params) => <TextField {...params} helperText={null} />}
    //                 />
    //             </Stack>
    //         </LocalizationProvider>
    //     </div>
    // )

    // return (
    //     <div className='dynamic-modal dates-modal' onClick={(ev) => ev.stopPropagation()}>
    //         dates
    //     </div>
    // )

    return (
        <div className={`dynamic-modal dates-modal ${className ? className : ''}`} onClick={(ev) => ev.stopPropagation()}>
            dates
        </div>
    )
}