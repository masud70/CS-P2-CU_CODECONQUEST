"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./auth.css";

export default function RootLayout({ children }) {
	const [bgImage, setbgImage] = useState("/assets/1.jpg");

	useEffect(() => {
		let num = 1;
		setInterval(() => {
			setbgImage("/assets/" + num + ".jpg");
			num = num + 1;
			if (num == 10) num = 1;
		}, 5000);
	}, []);

	return (
		<Box className={"main"}>
			<Box className="absoluteBg text-foreground flexMiddle">
				<img
					className="img"
					src={bgImage}
					draggable={false}
					alt="background-image"
				/>
				{children}
			</Box>
		</Box>
	);
}
