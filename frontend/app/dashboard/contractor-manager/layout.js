"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MenuCard from "@/components/MenuCard";
import Home from "@/icon/Home";
import { toast } from "react-toastify";
import UserIcon from "@/icon/UserIcon";
import PlanIcon from "@/icon/PlanIcon";
import ManageIcon from "@/icon/ManageIcon";

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
				<MenuCard
					text="Collection Plan"
					icon={<PlanIcon />}
					link="/dashboard/contractor-manager/collection-plan"
				/>
				<MenuCard
					text="Manage Collection Plan(s)"
					icon={<ManageIcon />}
					link="/dashboard/contractor-manager/manage-plan"
				/>
			</div>
			<div className="w-2/3 lg:w-4/5 p-2 overflow-auto">{children}</div>
		</div>
	);
};

export default layout;
