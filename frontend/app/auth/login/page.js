"use client"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import './login.css'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress';
import ATextField from '../components/ATextField'

export default function Login() {

  const [mobileNumber, setmobileNumber] = useState('')
  const [password, setpassword] = useState('')
  const [errorMessaage, seterrorMessaage] = useState('')  

  return (
        <Box className='inputDiv'>
          <Typography className='DivTitle' variant='h4'>Log In</Typography>
          <Box>
            <ATextField type={'text'} label={'Mobile Number'} setFunction={setmobileNumber} value={mobileNumber}/>

            <ATextField type={'password'} label={'Password'} setFunction={setpassword} value={password}/>
          </Box>
          <Box className='errorMessageDiv'>
            {
              errorMessaage.length>0 && 
              <Typography className='errorMessageText' >** {errorMessaage} **</Typography>
            }
            
          </Box>
          <Box className="forgotPasswordDiv">
            <Link href={'/auth/forgot-password'} className='forgotPasswordLink'>Forgot Password?</Link>
          </Box>
          <Box className='SubmitButtonDiv'>
              <Button className='SubmitButton' disabled={mobileNumber.length<1 || password.length<1}>Submit</Button>
              {/* <CircularProgress size={25} color={'error'} sx={{color:'white'}} /> */}
          </Box>

        </Box>  
  )
}
