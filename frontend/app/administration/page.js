"use client";

import React, { useState } from "react";
import "./administration.css";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

import { TiThMenu } from "react-icons/ti";
import DrawerList from "./components/DrawerList/DrawerList";
import UserManagementTab from "./components/Tabs/UserManagementTab/UserManagementTab";

export default function Page() {
	const [sideBarShow, setsideBarShow] = useState(false);

	const toggleDrawer = () => () => {
		setsideBarShow(!sideBarShow);
	};

	return (
		<Box className="AdminPageDiv">
			<Box className={"hamBar"} onClick={toggleDrawer()}>
				<TiThMenu size={"1.5em"} />
			</Box>

			<UserManagementTab />

			<Drawer open={sideBarShow} onClose={toggleDrawer()}>
				<DrawerList toggleDrawer={toggleDrawer} />
			</Drawer>
		</Box>
	);
}
