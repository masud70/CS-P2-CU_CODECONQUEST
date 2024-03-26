"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import Logout from "@/icon/Logout";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/state/authSlice";
import { useRouter } from "next/navigation";

export default function Header() {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const submitLogout = async () => {
		try {
			setIsLoading(true);
			const result = await axios({
				method: "GET",
				url: process.env.backendUrl + "/auth/logout",
				headers: {
					authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			dispatch(logout());
			router.push("/");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<div className="w-full min-h-[60px] bg-sky-300 flex justify-between items-center">
				<div className="w-[25%] text-center"></div>
				<div className="w-[50%] items-center text-center font-bold text-2xl">
					System Administration
				</div>
				<div className="w-[25%] flex justify-end space-x-2 px-2">
					<Button
						isLoading={isLoading}
						color="danger"
						variant="bordered"
						endContent={<Logout />}
						onClick={submitLogout}
					>
						Log Out
					</Button>
					<Avatar
						name="Masud"
						src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
					/>
				</div>
			</div>
		</>
	);
}
