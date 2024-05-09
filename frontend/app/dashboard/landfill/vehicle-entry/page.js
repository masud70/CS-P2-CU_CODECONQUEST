"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const page = () => {
	const [data, setData] = useState({
		arrival: dayjs(new Date()),
		departure: dayjs(new Date()),
	});
	const onChangeValue = (field, value) => {
		setData((pre) => ({ ...pre, [field]: value }));
	};

	return (
		<div className="w-full text-center items-center justify-center flex flex-col">
			<div className="font-bold text-3xl">Add Vehicle Entry</div>
			<Divider />
			<div className="my-2 py-2 w-4/5 flex flex-col space-y-10">
				<Input
					type="text"
					placeholder="Landfill ID"
					label="Landfill ID"
					labelPlacement="outside"
					className="font-bold"
					name="landfillId"
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
					placeholder="Vehicle ID"
					label="Vehicle ID"
					labelPlacement="outside"
					className="font-bold"
					name="vehicleId"
					value={data.vehicleId}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Volume Of Waste"
					label="Volume Of Waste"
					labelPlacement="outside"
					className="font-bold"
					name="volumeOfWaste"
					value={data.volumeOfWaste}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<DateTimePicker
					label="Arrival Time"
					value={data.arrival}
					onChange={(date) => onChangeValue("arrival", date)}
				/>
				<DateTimePicker
					label="Departure Time"
					value={data.arrival}
					onChange={(date) => onChangeValue("departure", date)}
				/>
			</div>
			<div className="mt-6">
				<Button color="primary" size="lg">
					Submit
				</Button>
			</div>
		</div>
	);
};

export default page;
