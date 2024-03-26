"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const layout = ({ children }) => {
	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		if (!hasCookie(process.env.tokenKey)) {
			router.push("/");
		} else {
			router.push("/dashboard");
		}
	}, [auth]);

	return <div>{children}</div>;
};

export default layout;
