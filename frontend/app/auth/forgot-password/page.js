"use client"

import React, { useState } from 'react'
import './forgotPass.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DisplaySnackBar from '../components/DisplaySnackBar'
import ATextField from '../components/ATextField'
import {CircularProgress} from "@nextui-org/react";

export default function Page() {

    const [mobileNumber, setmobileNumber] = useState('')
    const [otp, setotp] = useState('')
    const [errorMessaage, seterrorMessaage] = useState('')
    const [open, setopen] = useState(true)

    const handleClose = ()=>{
        setopen(!open)
    }

    return (
        <Box className='inputDiv'>
            <Typography className='DivTitle' variant='h6'>Initiate Password Reset</Typography>
            <Box>
                <ATextField type={'text'} label={'Mobile Number'} setFunction={setmobileNumber} value={mobileNumber}/>
            </Box>
            <Box className='errorMessageDiv'>
            {
                errorMessaage.length>0 && 
                <Typography className='errorMessageText' >** {errorMessaage} **</Typography>
            }
            
            </Box>
            <Box className="sendOTPAgainDiv">
                <Button className='sendOTPAgain'>Send OTP again</Button>
            </Box>
            <Box>
                <ATextField type={'text'} label={'OTP'} setFunction={setotp} value={otp}/>
            </Box>
            <Box className='SubmitButtonDiv'>
                <Button className='SubmitButton' disabled={mobileNumber.length<1}>Send OTP
                {/* <CircularProgress color="primary" size="sm" aria-label="Loading..." /> */}
                </Button>
            </Box>
               
           <DisplaySnackBar open={open} message={"OTP Sent to your mobile."}/>

        </Box> 
    )
}
