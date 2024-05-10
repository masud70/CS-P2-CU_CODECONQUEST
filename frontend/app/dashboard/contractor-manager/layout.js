"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MenuCard from "@/components/MenuCard";
import Truck from "@/icon/Truck";
import Home from "@/icon/Home";
import StsIcon from "@/icon/StsIcon";
import { toast } from "react-toastify";
import UserIcon from "@/icon/UserIcon";

const layout = ({ children }) => {
	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		if (
			!hasCookie(process.env.tokenKey) ||
			!auth.roles.includes("contractor_manager")
		) {
			toast.error("Invalid access!");
			router.push("/dashboard");
		}
	}, [auth]);

	return (
		<div className="w-full bg-[#eaf8ef] h-full flex flex-row rounded-b overflow-hidden">
			<div className="w-1/3 lg:w-1/5 h-full p-2 bg-slate-200 flex flex-col space-y-4 overflow-auto">
				<MenuCard
					text="Home"
					icon={<Home />}
					link="/dashboard/contractor-manager"
				/>
				<MenuCard
					text="Employee Registration"
					icon={<UserIcon />}
					link="/dashboard/contractor-manager/register-employee"
				/>
			</div>
			<div className="w-2/3 lg:w-4/5 p-2 overflow-auto">{children}</div>
		</div>
	);
};

export default layout;
