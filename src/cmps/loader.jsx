import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export const Loader = () => {
    return (
        <div className='loader-container'>
            <CircularProgress style={{ width: '6%', height: '6%' }} />
        </div>)
}