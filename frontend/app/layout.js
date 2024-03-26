import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "EcoSync | CU_Codeconquest",
	description: "Code Samurai - Phase 2 solution by Team CU_Codeconquest",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<main className="text-foreground bg-background">
						{children}
						<ToastContainer />
					</main>
				</Providers>
			</body>
		</html>
	);
}
