import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { Box } from "@mui/material";
import Header from "./components/Header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "System Adim | EcoSync | CU_Codeconquest",
	description: "Code Samurai - Phase 2 solution by Team CU_Codeconquest",
};


export default function RootLayout({ children }) {


	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Box sx={{width:'100vw',height:'100vh',backgroundColor:'white'}}>
						<Header/>
                        {children}
					</Box>
				</Providers>
			</body>
		</html>
	);
}

