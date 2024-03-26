import Header from "./components/Header/header";

export const metadata = {
	title: "System Adim | EcoSync | CU_Codeconquest",
	description: "Code Samurai - Phase 2 solution by Team CU_Codeconquest",
};

export default function Layout({ children }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
