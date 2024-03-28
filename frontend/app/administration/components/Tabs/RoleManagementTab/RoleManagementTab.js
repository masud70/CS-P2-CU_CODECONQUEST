import React from 'react'
import {Select, SelectItem, Chip, Button} from "@nextui-org/react";
import {users, animals} from "./data";
import { Box, Typography } from '@mui/material';
import {Autocomplete, AutocompleteItem, Avatar} from "@nextui-org/react";
import { RiUserSearchFill } from "react-icons/ri";
import { PieChart  } from '@mui/x-charts';

export default function roleManagementTab() {
  const size = {
    width: 400,
    height: 200,
  };
  const data = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 20, label: 'D' },
  ];
  return (
    <Box>
      <Box className="w-full h-72 mb-10 flex flex-row justify-center items-center">
          <Box className='w-[50%]'>
              <Typography variant='h4' className='w-full text-teal-500 font-bold mb-3'>|| Roles Overview</Typography>
              <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
              </PieChart>
          </Box>
          <Box className='w-[50%]'>
              <Typography variant='h4' className='w-full text-teal-500 font-bold mb-3'>|| Basic Description</Typography>
          </Box>
      </Box>
      <Box className="w-full h-56 flex items-center flex-col">
          <Typography variant='h4' className='w-full text-teal-500 font-bold mb-3'>|| Create / Customize Role</Typography>
          <Box className="w-full flex flex items-center gap-1.5 flex-row">

            <Box className="w-[32%]">
              <p className='ml-1 mb-1'>Role(s)</p>
                <Autocomplete 
                    allowsCustomValue
                    label="Search a role" 
                    variant="bordered"
                    className="max-w-xs" 
                    defaultItems={animals}
                  >
                    {(item) => <AutocompleteItem className='text-zinc-800' key={item.value}>{item.label}</AutocompleteItem>}
                  </Autocomplete>
            </Box>
            <Box className="w-[32%]">
              <Select
                items={users}
                label="Permissions"
                variant="bordered"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Select Permissions"
                labelPlacement="outside"
                classNames={{
                  base: "max-w-xs",
                  trigger: "min-h-unit-12 py-2",
                }}
                renderValue={(items) => {
                  return (
                    <Box className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Chip key={item.key}>{item.data.name}</Chip>
                      ))}
                    </Box>
                  );
                }}
              >
                {(user) => (
                  <SelectItem key={user.id} textValue={user.name}>
                    <Box className="flex gap-2 items-center">
                      <Box className="flex flex-col">
                        <span className="text-small text-zinc-800">{user.name}</span>
                        <span className="text-tiny text-default-400 text-zinc-800">{user.email}</span>
                      </Box>
                    </Box>
                  </SelectItem>
                )}
              </Select>
            </Box>
            <Box className="w-[32%]">
                <Button color="success" variant="bordered" className='mt-5' isLoading>
                    Submit
                </Button>
            </Box>
          </Box>
      </Box>
      <Box className="w-full">
          <Typography variant='h4' className='w-full text-teal-500 font-bold mb-3'>|| Assign Role</Typography>
          <Box className="w-full flex flex items-center gap-1.5 flex-row">

            <Box className="w-[50%]">
              <p className='ml-1 mb-1'>User</p>
              <Autocomplete
                  classNames={{
                    base: "w-full",
                    listboxWrapper: "max-h-[320px]",
                    selectorButton: "text-default-500"
                  }}
                  defaultItems={users}
                  inputProps={{
                    classNames: {
                      input: "ml-1",
                      inputWrapper: "h-[48px]",
                    },
                  }}
                  listboxProps={{
                    hideSelectedIcon: true,
                    itemClasses: {
                      base: [
                        "rounded-medium",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500",
                      ],
                    },
                  }}
                  aria-label="Select users"
                  placeholder="Search by Name / Email / Mobile Number"
                  popoverProps={{
                    offset: 10,
                    classNames: {
                      base: "rounded-large",
                      content: "p-1 border-small border-default-100 bg-background",
                    },
                  }}
                  startContent={<RiUserSearchFill className="text-default-400" size={25} />}
                  radius="full"
                  variant="bordered"
                >
                {(item) => (
                  <AutocompleteItem key={item.id} textValue={item.name}> 
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
                        <div className="flex flex-col">
                          <span className="text-small">{item.name}</span>
                          <span className="text-tiny text-default-400">{item.team}</span>
                        </div>
                      </div>
                      <Button
                        className="border-small mr-0.5 font-medium shadow-small"
                        radius="full"
                        size="sm"
                        variant="bordered"
                      >
                        Select
                      </Button>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </Box>
            <Box className="w-[28%] flex justify-center">
              <Select
                items={users}
                label="Role"
                variant="bordered"
                isMultiline={true}
                placeholder="Select a role"
                labelPlacement="outside"
                classNames={{
                  base: "max-w-xs px-5",
                  trigger: "min-h-unit-12 py-2",
                }}
                renderValue={(items) => {
                  return (
                    <Box className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Chip key={item.key}>{item.data.name}</Chip>
                      ))}
                    </Box>
                  );
                }}
              >
                {(user) => (
                  <SelectItem key={user.id} className='text-zinc-800' textValue={user.name}>
                    <Box className="flex gap-2 items-center">
                      <Box className="flex flex-col">
                        <span className="text-small text-zinc-800">{user.name}</span>
                        <span className="text-tiny text-default-400 text-zinc-800">{user.email}</span>
                      </Box>
                    </Box>
                  </SelectItem>
                )}
              </Select>
            </Box>
            <Box className="w-[20%] flex justify-center">
                <Button color="success" variant="bordered" className='mt-5' isLoading>
                    Submit
                </Button>
            </Box>
          </Box>
      </Box>
    </Box>
  )
}