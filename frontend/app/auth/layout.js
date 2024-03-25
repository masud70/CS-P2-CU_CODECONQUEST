"use client"

import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import './auth.css'


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

	const [bgImage, setbgImage] = useState('/assets/1.jpg')


	useEffect(() => {
		let num = 1
		setInterval(() => {
		  setbgImage('/assets/'+num+'.jpg')
		  num = num + 1;
		  if(num==10) num = 1;
		}, 3000)
	  }, []);


	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Box className={'main'}>
						<Box className='absoluteBg text-foreground flexMiddle' >
							<img className='img' src={bgImage} draggable={false} alt="background-image"/>
							{children}
						</Box>
						
					</Box>
				</Providers>
			</body>
		</html>
	);
}

