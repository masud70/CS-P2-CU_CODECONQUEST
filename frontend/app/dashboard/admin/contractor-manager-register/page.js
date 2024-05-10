"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	const registerContractor = async () => {
		try {
			setLoading(true);
			const res = await axios({
				method: "POST",
				url: `${process.env.backendUrl}/admin/contractor-manager-register`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: data,
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			toast.success(res.data.message);
			setData({});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-col justify-center items-center space-y-3">
			<div className="font-bold text-3xl text-center py-3">
				Contractor Manager Registration
			</div>
			<Divider />
			<div className="my-2 py-2 w-4/5 flex flex-col space-y-10">
				<Input
					type="text"
					placeholder="Full Name"
					label="Full Name"
					labelPlacement="outside"
					className="font-bold"
					name="name"
					value={data.name}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Email"
					label="Email"
					labelPlacement="outside"
					className="font-bold"
					name="email"
					value={data.email}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Contact Number"
					label="Contact Number"
					labelPlacement="outside"
					className="font-bold"
					name="mobileNumber"
					value={data.mobileNumber}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Username"
					label="Username"
					labelPlacement="outside"
					className="font-bold"
					name="username"
					value={data.username}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="password"
					placeholder="Password"
					label="Password"
					labelPlacement="outside"
					className="font-bold"
					name="password"
					value={data.password}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
			</div>
			<div className="mt-6">
				<Button
					isLoading={loading}
					disabled={loading}
					color="primary"
					size="lg"
					onClick={registerContractor}
				>
					Register
				</Button>
			</div>
		</div>
	);
};

export default page;
