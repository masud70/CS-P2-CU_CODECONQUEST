import React from 'react'
import './header.css'
import { Box, Typography } from '@mui/material'
import { Button } from '@nextui-org/react'

import {UserIcon} from './UserIcon';

export default function Header() {
  return (
    <Box className={"menuDiv"}>
        <Box className={["alignLeft","menuCol"]}>
           
        </Box>
        <Box className={["alignCenter","menuCol"]}>
            <Typography sx={{fontWeight:'bold'}} variant='h5'>System Administration</Typography>
        </Box>
        <Box className={["alignRight","menuCol"]}>
            <Button color="danger" variant="bordered" startContent={<UserIcon/>}>
                Log Out
            </Button>
        </Box>
    </Box>
  )
}
