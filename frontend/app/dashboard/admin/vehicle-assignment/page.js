"use client";
import BookmarkIcon from "@/icon/BookmarkIcon";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({});
	const [sts, setSts] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const auth = useSelector((st) => st.auth);

	const getAllSts = async () => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/sts/all-sts`,
				headers: {
					Authorization: "Bearer " + auth.token,
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

	const getVehicles = async () => {
		try {
			const res = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/sts/unassigned-vehicles`,
				headers: {
					Authorization: "Bearer " + auth.token,
				},
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			const array = res.data.vehicles.map((item) => ({
				label: item.regNumber,
				value: item.id,
			}));
			setVehicles(array);
			console.log(res.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	const submitVehicles = async () => {
		try {
			const res = await axios({
				method: "PUT",
				url: `${process.env.backendUrl}/admin/assign-vehicle-to-sts`,
				headers: {
					Authorization: "Bearer " + auth.token,
				},
				data: data,
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			toast.success(res.data.message);
			setData({});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllSts();
		getVehicles();
	}, []);

	return (
		<div className="w-full flex justify-center items-center">
			<div className="w-4/5">
				<div className="w-full rounded overflow-hidden  border-2 border-[#150038]">
					<div className="w-full text-white bg-[#150038] flex items-center p-2 justify-between">
						<BookmarkIcon />
						<div className="text-white font-bold text-2xl">
							Assign Vehicle to STS
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
							placeholder="Select vehicles"
							labelPlacement="outside"
							label="Select vehicles"
							selectionMode="multiple"
							className="py-0 mt-0 font-bold"
							name="vehicleIds"
							selectedKeys={data.vehicleIds}
							onChange={(e) => {
								setData((prevData) => ({
									...prevData,
									[e.target.name]: e.target.value.split(","),
								}));
							}}
						>
							A
							{vehicles.map((item) => (
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
							<Button onClick={submitVehicles} color="primary">
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
