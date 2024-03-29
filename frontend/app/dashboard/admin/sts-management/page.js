"use client";
import BookmarkIcon from "@/icon/BookmarkIcon";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({});
	const [sts, setSts] = useState([]);
	const [managers, setManagers] = useState([]);

	const getAllSts = async () => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/sts/all-sts`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			const array = res.data.sts.map((item) => ({
				label: item.locationName || item.wardNumber.toString(),
				value: item.id,
			}));
			setSts(array);
		} catch (error) {
			console.log(error.message);
		}
	};

	const getStsManagers = async () => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/sts/managers/sts_manager`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			const array = res.data.managers.map((item) => ({
				label: item.name || item.email,
				value: item.id,
			}));
			setManagers(array);
		} catch (error) {
			console.log(error.message);
		}
	};

	const submitManagers = async () => {
		try {
			const res = await axios({
				method: "POST",
				url: `${process.env.backendUrl}/admin/assign-sts-manager`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: data,
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			toast.success(res.data.message);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllSts();
		getStsManagers();
	}, []);

	return (
		<div className="w-full flex justify-center items-center">
			<div className="w-4/5">
				<div className="w-full rounded overflow-hidden  border-2 border-[#150038]">
					<div className="w-full text-white bg-[#150038] flex items-center px-2 justify-between">
						<BookmarkIcon />
						<div className="text-white font-bold text-2xl">
							Assign STS Manager
						</div>
					</div>
					<div className="w-full p-2 flex flex-col space-y-10 justify-center items-center">
						<Select
							placeholder="Select STS"
							labelPlacement="outside"
							label="Select STS"
							className="py-0 mt-0 font-bold"
							name="stsId"
							onChange={(e) => {
								setData((prevData) => ({
									...prevData,
									[e.target.name]: e.target.value,
								}));
							}}
						>
							A
							{sts.map((type) => (
								<SelectItem
									className="text-slate-900"
									key={type.value}
									value={type.value}
								>
									{type.label}
								</SelectItem>
							))}
						</Select>
						<Select
							placeholder="Select managers"
							labelPlacement="outside"
							label="Select managers"
							selectionMode="multiple"
							className="py-0 mt-0 font-bold"
							name="managerIds"
							selectedKeys={data.managerIds}
							onChange={(e) => {
								setData((prevData) => ({
									...prevData,
									[e.target.name]: e.target.value.split(","),
								}));
							}}
						>
							A
							{managers.map((item) => (
								<SelectItem
									className="text-slate-900"
									key={item.value}
									value={item.value}
								>
									{item.label}
								</SelectItem>
							))}
						</Select>
						<div className="flex space-x-2 font-bold">
							<Button onClick={submitManagers} color="primary">
								Save
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
