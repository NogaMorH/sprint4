import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export const Loader = () => {
    return (
        <div className='loader-container'>
            <CircularProgress style={{ width: '7%', height: '7%' }} />
        </div>)
}