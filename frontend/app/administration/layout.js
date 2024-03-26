import Drawer from "./components/Drawer";
import Header from "./components/Header/header";

export const metadata = {
	title: "System Admin | EcoSync | CU_Codeconquest",
	description: "Code Samurai - Phase 2 solution by Team CU_Codeconquest",
};

export default function Layout({ children }) {
	return (
		<>
			<Header />
			<div className="px-4 py-2 w-full flex justify-center">
				<div className="w-[90%]">{children}</div>
			</div>
			<Drawer />
		</>
	);
}
