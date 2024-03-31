import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import './dashboard.css'

const page = () => {
	return (
		<div className="w-[80%] h-screen justify-center text-center items-center flex flex-col space-y-3">
			
			<Box className="flex flex-row justify-evenly w-full">
				<div className="aSingleDiv">
					<Link href="/dashboard/admin">System Admin</Link>
				</div>
				<div className="aSingleDiv">
					<Link href="/dashboard/sts">STS Manager</Link>
				</div>
				<div className="aSingleDiv">
					<Link href="/dashboard/landfill">Landfill Manager</Link>
				</div>
			</Box>
			
		</div>
	);
};

export default page;
