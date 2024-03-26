"use client";

import React, { useEffect } from "react";
import "./administration.css";
import { Box } from "@mui/material";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import UserManagementTab from "./components/Tabs/UserManagementTab/UserManagementTab";

export default function Page() {
	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		if (!hasCookie(process.env.tokenKey)) {
			// router.push("/");
		}
	}, [auth]);

	return (
		<Box className="AdminPageDiv">
			<UserManagementTab />
		</Box>
	);
}
