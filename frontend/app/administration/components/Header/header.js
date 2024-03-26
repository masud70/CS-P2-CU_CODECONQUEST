import React from "react";
import { Box } from "@mui/material";
import { Button } from "@nextui-org/react";
import { UserIcon } from "./UserIcon";

export default function Header() {
	return (
		<Box className="w-full min-h-[60px] bg-sky-300 flex justify-between items-center px-4">
			<Box className="w-[25%] text-center"></Box>
			<Box className="w-[50%] text-center font-bold text-2xl text-cyan-800">
				System Administration
			</Box>
			<Box className="w-[25%] flex justify-end">
				<Box className="">
					<Button
						color="danger"
						variant="bordered"
						startContent={<UserIcon />}
					>
						Log Out
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
