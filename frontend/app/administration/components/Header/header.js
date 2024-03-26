import React from "react";
// import "./header.css";
import { Box, Typography } from "@mui/material";
import { Button } from "@nextui-org/react";
import { UserIcon } from "./UserIcon";

export default function Header() {
	return (
		<>
			<div className="w-full min-h-[60px] bg-sky-300 flex justify-between items-center">
				<div className="w-[25%] text-center"></div>
				<div className="w-[50%] items-center text-center font-bold text-2xl">
					System Administration
				</div>
				<div className="w-[25%] flex items-center justify-center">
					<Box className="">
						<Button
							color="danger"
							variant="bordered"
							startContent={<UserIcon />}
						>
							Log Out
						</Button>
					</Box>
				</div>
			</div>
			{/* <Box className={"menuDiv"}>
				<Box className={["alignLeft", "menuCol"]}></Box>
				<Box className={["alignCenter", "menuCol"]}>
					<Typography sx={{ fontWeight: "bold" }} variant="h5">
						System Administration
					</Typography>
				</Box>
				<Box className={["alignRight", "menuCol"]}>
					<Button
						color="danger"
						variant="bordered"
						startContent={<UserIcon />}
					>
						Log Out
					</Button>
				</Box>
			</Box> */}
		</>
	);
}
