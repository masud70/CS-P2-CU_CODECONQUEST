"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "@/components/Navbar";

const layout = ({ children }) => {
	const router = useRouter();
	const auth = useSelector((st) => st.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

	return (
		<div className="" style={{backgroundColor:'#eaf8ef'}}>
			<NavBar>{children}</NavBar>
		</div>
	);
};

export default layout;
