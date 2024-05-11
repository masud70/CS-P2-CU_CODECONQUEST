"use client";
import { TimePicker } from "@mui/x-date-pickers";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import React, { useState } from "react";

const page = () => {
	const [data, setData] = useState({ startTime: dayjs(new Date()).unix() });
	const areas = [
		{ label: "Area 1", value: 1 },
		{ label: "Area 2", value: 2 },
		{ label: "Area 3", value: 3 },
	];

	return (
		<div className="w-full flex justify-center items-center flex-col space-y-4">
			<div className="font-bold text-2xl my-2">Collection Plan</div>
			<div className="w-full lg:w-3/5 border border-slate-300 rounded-lg p-3">
				<Select
					placeholder="Select area"
					labelPlacement="outside"
					label="Select area"
					className="py-0 mt-0 font-bold"
					name="area"
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				>
					A
					{areas.map((type) => (
						<SelectItem
							className="text-slate-900"
							key={type.value}
							value={type.value}
						>
							{type.label}
						</SelectItem>
					))}
				</Select>
				<div className="flex flex-col space-y-2">
					<span className="font-bold text-sm">
						Collection start time
					</span>
					<TimePicker
						value={dayjs.unix(data.startTime)}
						onChange={(newValue) => {
							setData((p) => ({
								...p,
								startTime: dayjs(newValue).unix(),
							}));
						}}
					/>
				</div>
				<Input
					type="number"
					placeholder="Collection duration"
					label="Collection duration"
					labelPlacement="outside"
					className="font-bold pt-2"
					name="collectionDuration"
					value={data.collectionDuration}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Number of labours"
					label="Number of labours"
					labelPlacement="outside"
					className="font-bold pt-2"
					name="labourCount"
					value={data.labourCount}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Number of vans"
					label="Number of vans"
					labelPlacement="outside"
					className="font-bold pt-2"
					name="vanCount"
					value={data.vanCount}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Expected daily solid wate"
					label="Expected daily solid wate"
					labelPlacement="outside"
					className="font-bold pt-2"
					name="expectedSolidWastePerDay"
					value={data.expectedSolidWastePerDay}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
			</div>
			<Button size='lg' color='success'>Submit Plan</Button>
		</div>
	);
};

export default page;
