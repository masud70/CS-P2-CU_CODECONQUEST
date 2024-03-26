import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Divider } from '@nextui-org/react'
import React from 'react'
import './DrawerList.css'
import { FaUsersGear } from "react-icons/fa6";

export default function DrawerList({toggleDrawer}) {
  return (
    <Box sx={{ width: 250,paddingY:'5px' }} role="presentation" onClick={toggleDrawer()}>
        <Typography className='menuTitle' variant='h4'>Menu</Typography>
        <List>
        {['User Management'].map((text, index) => (
            <>
                <ListItem key={text} disablePadding onClick={()=>{console.log('hudai')}}>
                    <ListItemButton>
                        <ListItemIcon>    
                            <FaUsersGear />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                <Divider/>
            </>
        ))}
        </List>
    </Box>
  )
}
