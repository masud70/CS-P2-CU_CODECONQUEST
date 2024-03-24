import Snackbar from '@mui/material/Snackbar'
import React, { useState } from 'react'

export default function DisplaySnackBar(props) {

    const {open,message} = props
    
    const [vertical, setvertical] = useState('top')
    const [horizontal, sethorizontal] = useState('center')


    return (
        <Snackbar
            anchorOrigin={{vertical , horizontal }}
            open={open}
            autoHideDuration={3000}
            message={message}
          />
    )
}
