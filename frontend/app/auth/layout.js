"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./auth.css";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({ children }) {
	const [bgImage, setbgImage] = useState("/assets/1.jpg");

	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		if (hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

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
