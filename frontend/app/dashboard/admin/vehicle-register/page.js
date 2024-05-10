"use client";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const capacities = [
		{ value: 3, label: "3 Tons" },
		{ value: 5, label: "5 Tons" },
		{ value: 7, label: "7 Tons" },
	];
	const truckType = [
		{ value: "Open Truck", label: "Open Truck" },
		{ value: "Dump Truck", label: "Dump Truck" },
		{ value: "Compactor", label: "Compactor" },
		{ value: "Container Carrier", label: "Container Carrier" },
	];

	const addVehicle = async () => {
		try {
			setLoading(true);
			const res = await axios({
				method: "POST",
				url: `${process.env.backendUrl}/admin/add-vehicle`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: { ...data },
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
				Vehicle Register
			</div>
			<Divider />
			<div className="my-2 py-2 w-4/5 flex flex-col space-y-10">
				<Input
					type="text"
					placeholder="Registration Number"
					label="Registration Number"
					labelPlacement="outside"
					className="font-bold"
					name="regNumber"
					value={data.regNumber}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Select
					placeholder="Select truck type"
					labelPlacement="outside"
					label="Select truck type"
					className="py-0 mt-0 font-bold"
					name="type"
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				>
					A
					{truckType.map((type) => (
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
					placeholder="Select capacity"
					labelPlacement="outside"
					label="Select capacity"
					className="py-0 mt-0 font-bold"
					name="capacity"
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: parseInt(e.target.value),
						}));
					}}
				>
					A
					{capacities.map((capacity) => (
						<SelectItem
							className="text-slate-900"
							key={capacity.value}
							value={capacity.value}
						>
							{capacity.label}
						</SelectItem>
					))}
				</Select>
				<Input
					type="number"
					placeholder="Fuel cost per kilometer - fully loaded"
					label="Fuel cost per kilometer - fully loaded (TK)"
					labelPlacement="outside"
					className="font-bold"
					name="costPerKiloLoaded"
					value={data.costPerKiloLoaded}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Fuel cost per kilometer - unloaded"
					label="Fuel cost per kilometer - unloaded (TK)"
					labelPlacement="outside"
					className="font-bold"
					name="costPerKiloUnLoaded"
					value={data.costPerKiloUnLoaded}
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
					onClick={addVehicle}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default page;
