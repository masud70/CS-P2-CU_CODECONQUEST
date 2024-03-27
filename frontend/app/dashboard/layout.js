"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "@/components/Navbar";

const layout = ({ children }) => {
	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		if (!hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

	return (
		<div className="">
			<NavBar>{children}</NavBar>
		</div>
	);
};

export default layout;
