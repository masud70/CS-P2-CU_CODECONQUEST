import { Box } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<div className="font-bold items-center w-screen h-screen justify-center flex">
				<Box className={"main absolute z-0"}>
					<Box className="absoluteBg text-foreground flexMiddle">
						<img
							className="img"
							src="/assets/ecosync.png"
							draggable={false}
							alt="background-image"
						/>
					</Box>
				</Box>
				<div className="z-10 text-center items-center justify-center flex space-y-2 flex-col mt-64">
					<div className="font-extrabold text-6xl text-slate-900">
						Code Samurai 2024
					</div>
					<div className="font-extrabold text-4xl text-slate-900">
						Team: CU_CODECONQUEST
					</div>
					<div className="text-xl font-bold rounded-xl border-2 transition-colors bg-green-500 overflow-hidden hover:text-white border-solid hover:bg-green-800 w-32 p-2">
						<Link href="/auth/login">Login</Link>
					</div>
				</div>
			</div>
		</>
	);
}
