"use client";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({ dateTime: dayjs(new Date()).unix() });
	const [loading, setLoading] = useState(false);

	const registerEntry = async () => {
		try {
			setLoading(true);
			toast.warning("Method not implemented yet!");
			// toast.success(res.data.message);
			// setData({});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const wasteType = [
		{ label: "Domestic", value: "domestic" },
		{ label: "Plastic", value: "plastic" },
		{ label: "Construction Waste", value: "placonstruction_waste" },
	];

	return (
		<div className="w-full flex flex-col justify-center items-center space-y-3">
			<div className="font-bold text-3xl text-center py-3">
				Contractor's Dump Entry
			</div>
			<Divider />
			<div className="my-2 py-2 w-4/5 flex flex-col space-y-10">
				<div className="flex flex-col space-y-2">
					<span className="font-bold text-sm">
						Date and Time of Collection
					</span>
					<DateTimePicker
						value={dayjs.unix(data.dateTime)}
						onChange={(newValue) => {
							setData((p) => ({
								...p,
								dateTime: dayjs(newValue).unix(),
							}));
						}}
					/>
				</div>
				<Input
					type="number"
					placeholder="Amount of Waste Collected (KG)"
					label="Amount of Waste Collected (KG)"
					labelPlacement="outside"
					className="font-bold"
					name="weightOfWaste"
					value={data.weightOfWaste}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Contractor ID"
					label="Contractor ID"
					labelPlacement="outside"
					className="font-bold"
					name="contractorId"
					value={data.contractorId}
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
					type="number"
					placeholder="Contractor ID"
					label="Contractor ID"
					labelPlacement="outside"
					className="font-bold"
					name="contractorId"
					value={data.contractorId}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Select
					placeholder="Type of waste collected"
					labelPlacement="outside"
					label="Type of waste collected"
					className="py-0 mt-0 font-bold"
					name="wasteType"
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				>
					A
					{wasteType.map((type) => (
						<SelectItem
							className="text-slate-900"
							key={type.value}
							value={type.value}
						>
							{type.label}
						</SelectItem>
					))}
				</Select>
				<Input
					type="text"
					placeholder="Designated STS ID"
					label="Designated STS ID"
					labelPlacement="outside"
					className="font-bold"
					name="stsId"
					value={data.stsId}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Vehicle used for Transportation"
					label="Vehicle used for Transportation"
					labelPlacement="outside"
					className="font-bold"
					name="vehicleUsed"
					value={data.vehicleUsed}
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
					onClick={registerEntry}
				>
					Register
				</Button>
			</div>
		</div>
	);
};

export default page;
