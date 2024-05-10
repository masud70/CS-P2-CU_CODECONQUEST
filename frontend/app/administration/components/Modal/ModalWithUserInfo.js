import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image, useDisclosure} from "@nextui-org/react";
import { Box } from '@mui/material';


export default function ModalWithUserInfo({isOpen,setisOpen, data}) {

  
  const { onOpenChange} = useDisclosure()

  return (
    <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        scrollBehavior={'inside'}
        size={'2xl'}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col text-center text-zinc-800 gap-1">Atanu Kumar Dey</ModalHeader>
            <ModalBody className='text-zinc-800'>
              <Box className='flex justify-center w-full'>
                <Image width={'200px'} className='m-auto' src='https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'/>
              </Box>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam pulvinar risus non risus hendrerit venenatis.
                Pellentesque sit amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger"  variant="bordered" onPress={()=>{setisOpen(!isOpen)}}>
                Close
              </Button>
              {/* <Button color="primary" onPress={onClose}>
                Action
              </Button> */}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
  )
}
