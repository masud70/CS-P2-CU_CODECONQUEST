"use client"

import React, { useEffect, useState } from 'react'
import './resetPassword.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DisplaySnackBar from '../components/DisplaySnackBar'
import ATextField from '../components/ATextField'

import {CircularProgress} from "@nextui-org/react";

export default function Page() {

    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [errorMessaage, seterrorMessaage] = useState('')
    const [open, setopen] = useState(true)

    useEffect(() => {
      if(password.length>6 && confirmPassword.length>6 && password!=confirmPassword){
        seterrorMessaage(`Passwords doesn't march`)
      }
      else{
        seterrorMessaage('')
      }
    }, [password, confirmPassword])
    

    return (
        <Box className='inputDiv'>
            <Typography className='DivTitle' variant='h6'>Reset Password</Typography>
            <Box>
                <ATextField type={'password'} label={'Password'} setFunction={setpassword} value={password}/>
                <ATextField type={'password'} label={'Confirm Password'} setFunction={setconfirmPassword} value={confirmPassword}/>
            </Box>
            <Box className='errorMessageDiv'>
            {
                errorMessaage.length>0 && 
                <Typography className='errorMessageText' >** {errorMessaage} **</Typography>
            }
            
            </Box>
            <Box className='SubmitButtonDiv'>
                <Button className='SubmitButton' disabled={password.length<1 || confirmPassword.length<1 || password!=confirmPassword}>
                  Reset Password
                  {/* <CircularProgress color="primary" size="sm" aria-label="Loading..." /> */}
                 </Button>
            </Box>
            <DisplaySnackBar open={open} message={'Password has been reset'}/>

        </Box> 
    )
}
