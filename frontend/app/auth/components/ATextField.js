import { TextField } from '@mui/material'
import React from 'react'

export default function ATextField(props) {
    const {type,label,value,setFunction} = props

    return (
        <TextField
            className={['inputField']}  type={type}
            label={label} variant="outlined" value={value}
            onChange={(e) => setFunction(e.target.value)} fullWidth
            autoComplete="off" inputProps={{ style: { fontSize: 15,color: "white"} }}
            InputLabelProps={{ style: { fontSize: 15, color: "white" } }}
            />
  )
}
