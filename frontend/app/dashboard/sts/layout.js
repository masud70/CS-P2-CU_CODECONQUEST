"use client";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MenuCard from "@/components/MenuCard";
import Truck from "@/icon/Truck";
import Home from "@/icon/Home";
import Taka from "@/icon/Taka";
import RocketIcon from "@/icon/RocketIcon";
import { toast } from "react-toastify";

const layout = ({ children }) => {
	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		if (
			!hasCookie(process.env.tokenKey) //||!auth.roles.includes("sts_manager")
		) {
			toast.error("Invalid access!");
			router.push("/dashboard");
		}
	}, [auth]);

	return (
		<div className="w-full lg:w-4/5 h-full overflow-hidden bg-slate-200">
			<div className="mt-2 w-full h-full flex flex-row px-2 rounded overflow-hidden">
				<div className="w-1/3 lg:w-1/5 h-full p-2 bg-slate-200 flex flex-col space-y-2 overflow-auto border-r-2 border-slate-400">
					<MenuCard
						className="bg-purple-500"
						text="Home"
						icon={<Home />}
						link="/dashboard/sts"
					/>
					<MenuCard
						className="bg-blue-500"
						text="Vehicle Entry"
						icon={<Truck />}
						link="/dashboard/sts/vehicle-entry"
					/>
					<MenuCard
						className="bg-red-500"
						text="Bill"
						icon={<Taka />}
						link="/dashboard/sts/bill"
					/>
					<MenuCard
						className="bg-yellow-500"
						text="Route Optimization"
						icon={<RocketIcon />}
						link="/dashboard/sts/route-optimization"
					/>
				</div>
				<div className="w-2/3 lg:w-4/5 p-2 overflow-auto">
					{children}
				</div>
			</div>
		</div>
	);
};

export default layout;
