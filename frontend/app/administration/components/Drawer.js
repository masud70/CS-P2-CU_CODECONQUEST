"use client";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import DrawerList from "./DrawerList/DrawerList";
import { Box } from "@mui/material";
import { TiThMenu } from "react-icons/ti";

const DrawerMenu = () => {
	const [sideBarShow, setsideBarShow] = useState(false);

	return (
		<>
			<Box className="absolute top-3 left-2 text-white cursor-pointer">
				<TiThMenu
					size={"2em"}
					onClick={() => setsideBarShow((st) => !st)}
				/>
			</Box>
			<div>
				<Drawer 
					open={sideBarShow}
					onClose={() => setsideBarShow((st) => !st)}
				>
					<DrawerList 
						toggleDrawer={() => setsideBarShow((st) => !st)}
					/>
				</Drawer>
			</div>
		</>
	);
};

export default DrawerMenu;
