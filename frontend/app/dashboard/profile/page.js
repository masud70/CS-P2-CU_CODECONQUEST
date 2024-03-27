"use client";
import { UserIcon } from "@/app/administration/components/Header/UserIcon";
import EmailIcon from "@/icon/EmailIcon";
import MobileIcon from "@/icon/MobileIcon";
import RoleIcon from "@/icon/RoleIcon";
import { Button, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	const getUser = async () => {
		try {
			const result = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/profile`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
			});
			console.log(result.data);
			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			setUser(result.data.user);
		} catch (error) {
			console.log(error.message);
		}
	};
	const updateData = async (field, value) => {
		try {
			const res = await axios({
				method: "PUT",
				url: `${process.env.backendUrl}/profile`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: {
					field,
					value,
				},
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			toast.success(res.data.message);
            getUser();
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="w-full md:w-4/5 lg:w-3/5 bg-slate-200 grid grid-cols-1 gap-3 md:grid-cols-2 p-2 rounded">
			<div className="bg-white rounded overflow-hidden flex flex-col p-2 items-center">
				<div className="font-bold text-3xl py-2 text-slate-800">
					My profile
				</div>
				<Divider />
				<img
					className="rounded-xl overflow-hidden pt-4"
					src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
					width={250}
				/>
				<div className="font-bold text-2xl pt-2 text-[#1b0051]">
					{user?.name || "Name not set"}
				</div>
				<div className="font-bold text-lg text-[#1b0051]">
					({user?.role || "Role not assigned"})
				</div>
			</div>
			<div className="bg-white rounded overflow-hidden flex flex-col p-2 justify-center space-y-4 items-center">
				<div className="w-full rounded overflow-hidden  border-2 border-[#150038]">
					<div className="w-full text-white bg-[#150038] flex items-center px-2 justify-between">
						<UserIcon />
						<div className="text-white font-bold text-2xl">
							Name
						</div>
					</div>
					<div className="w-full p-2">
						<span className="text-xl font-semibold">
							{user?.name || "Name not set"}
						</span>
						<div className="flex space-x-2 font-bold">
							<Input
								value={user?.name}
								onValueChange={(val) =>
									setUser((u) => ({ ...u, name: val }))
								}
							/>
							<Button
								color="primary"
								onClick={() => updateData("name", user.name)}
							>
								Update
							</Button>
						</div>
					</div>
				</div>
				<div className="w-full rounded overflow-hidden  border-2 border-[#150038]">
					<div className="w-full text-white bg-[#150038] flex items-center px-2 justify-between">
						<EmailIcon />
						<div className="text-white font-bold text-2xl">
							Email
						</div>
					</div>
					<div className="w-full p-2">
						<span className="text-xl font-semibold">
							{user?.email}
						</span>
						<div className="flex space-x-2 font-bold">
							<Input
								disabled
								value={user?.email}
								placeholder="Email address"
							/>
							<Button disabled color="primary">
								Update
							</Button>
						</div>
					</div>
				</div>

				<div className="w-full rounded overflow-hidden  border-2 border-[#150038]">
					<div className="w-full text-white bg-[#150038] flex items-center px-2 justify-between">
						<MobileIcon />
						<div className="text-white font-bold text-2xl">
							Mobile Number
						</div>
					</div>
					<div className="w-full p-2">
						<span className="text-xl font-semibold">
							{user?.mobileNumber || "No number"}
						</span>
						<div className="flex space-x-2 font-bold">
							<Input
								type="number"
								value={user?.mobileNumber}
								placeholder="Mobile number"
								onValueChange={(val) =>
									setUser((u) => ({
										...u,
										mobileNumber: val,
									}))
								}
							/>
							<Button
								color="primary"
								onClick={() =>
									updateData(
										"mobileNumber",
										user.mobileNumber
									)
								}
							>
								Update
							</Button>
						</div>
					</div>
				</div>

				<div className="w-full rounded overflow-hidden  border-2 border-[#150038]">
					<div className="w-full text-white bg-[#150038] flex items-center px-2 justify-between">
						<RoleIcon />
						<div className="text-white font-bold text-2xl">
							Role
						</div>
					</div>
					<div className="w-full p-2">
						<span className="text-xl font-semibold">
							{user?.role}
						</span>
						<div className="flex space-x-2 font-bold">
							<Input value={user?.role} placeholder="Your role" />
							<Button disabled color="primary">
								Update
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
