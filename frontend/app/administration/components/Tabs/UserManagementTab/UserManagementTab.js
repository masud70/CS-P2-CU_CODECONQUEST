import React, { useState } from 'react'
import './UserManageTab.css'
import 'chart.js/auto';
import { Box, Typography } from '@mui/material';
import {Button, Select, SelectItem} from "@nextui-org/react";

import { DataGrid } from '@mui/x-data-grid';
import { MdDeleteForever } from "react-icons/md";


export default function UserManagementTab() {

  const [selectedUserType, setselectedUserType] = useState('')

  const userType = [
    {value:'hi',label:'hi'},
    {value:'hai',label:'haai'}
    
  ]

  const rows = [
    { id: 1, full_name: 'Hello', role: 'World' },
    { id: 2, full_name: 'DataGridPro', role: 'is Awesome' },
    { id: 3, full_name: 'MUI', role: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'full_name', headerName: 'Full Name', width: 300 },
    { field: 'role', headerName: 'Role', width: 150 },
  ];



  return (
    <Box className="h-auto w-full flex px-3">
      <Box className="w-[35%] h-full">
        <Box className="h-3/4">
            Ekhane ekta chart jabe
        </Box>
        <Box className="h-1/4">
          ekhane kichu basic numbers and information jabe
        </Box>

      </Box>
      <Box className="w-[65%] h-full">
          <Box>
            <Typography variant='h5' className='mb-0.5'>Manage Users</Typography>
            <Select 
                label="Select a user type" 
                className="max-w-l mb-0.5"
                onSelectionChange={(e)=>{setselectedUserType(e.currentKey)}}
              >
                {userType.map((animal) => (
                  <SelectItem className='text-zinc-800' key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
            </Select>
            <Box className="mt-3 text-right">
                  <Button color="danger" variant="bordered" startContent={<MdDeleteForever />}>Remove User</Button>
            </Box>
            <Box className="mt-3" sx={{minHeight:'500px'}}>
                <DataGrid onSelectionModelChange={(ids)=>{setselectedUserType(ids); }} checkboxSelection disableRowSelectionOnClick rows={rows} columns={columns} />
            </Box>
          </Box>
      </Box>
    </Box>
  )
}
