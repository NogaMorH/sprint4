// import * as React from 'react'
// import dayjs from 'dayjs'
// import AlarmIcon from '@mui/icons-material/Alarm'
// import SnoozeIcon from '@mui/icons-material/Snooze'
// import TextField from '@mui/material/TextField'
// import ClockIcon from '@mui/icons-material/AccessTime'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
// import Stack from '@mui/material/Stack'

export const DatesModal = ({ groupId, taskId, closeModal, className }) => {

    // const [dateWithNoInitialValue, setDateWithNoInitialValue] = React.useState(null)
    // const [dateWithInitialValue, setDateWithInitialValue] = React.useState(
    //     dayjs('2019-01-01T18:54'),
    // )

    // return (
    // <LocalizationProvider dateAdapter={AdapterDayjs} onClick={(ev) => ev.stopPropagation()}>
    //     <Stack spacing={3}>
    //         <MobileDateTimePicker
    //             value={dateWithInitialValue}
    //             onChange={(newValue) => {
    //                 setDateWithInitialValue(newValue)
    //             }}
    //             label="With error handler"
    //             onError={console.log}
    //             minDate={dayjs('2018-01-01T00:00')}
    //             inputFormat="YYYY/MM/DD hh:mm a"
    //             mask="____/__/__ __:__ _M"
    //             renderInput={(params) => <TextField {...params} />}
    //         />
    //     </Stack>
    // </LocalizationProvider>
    // )

    return (
        <div className={`dynamic-modal dates-modal ${className ? className : ''}`} onClick={(ev) => ev.stopPropagation()}>
            dates
        </div>
    )
}