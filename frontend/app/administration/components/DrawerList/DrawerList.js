import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { Divider } from "@nextui-org/react";
import React from "react";
import "./DrawerList.css";
import { FaUsersGear } from "react-icons/fa6";
import Link from "next/link";

export default function DrawerList({ toggleDrawer }) {
	return (
		<Box
			sx={{ width: 250, paddingY: "5px" }}
			role="presentation"
			onClick={toggleDrawer}
		>
			<Typography
				className="menuTitle w-full text-center font-bold"
				variant="h4"
			>
				Menu
			</Typography>
			<List>
				{[
					{ text: "Admin Home", link: "/administration" },
					{ text: "User Management", link: "/administration/user" },
					{ text: "Role Management", link: "/administration/role-management" },
				].map((item, index) => (
					<>
						<Link href={item.link}>
							<ListItem key={index} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<FaUsersGear />
									</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
							<Divider />
						</Link>
					</>
				))}
			</List>
		</Box>
	);
}
