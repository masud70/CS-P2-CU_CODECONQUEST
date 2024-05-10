"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({ regDate: dayjs(new Date()) });
	const [loading, setLoading] = useState(false);

	const registerContractor = async () => {
		try {
			setLoading(true);
			const res = await axios({
				method: "POST",
				url: `${process.env.backendUrl}/admin/contractor-register`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: data,
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			toast.success(res.data.message);
			setData({ regDate: dayjs(new Date()) });
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-col justify-center items-center space-y-3">
			<div className="font-bold text-3xl text-center py-3">
				Contractor Registration
			</div>
			<Divider />
			<div className="my-2 py-2 w-4/5 flex flex-col space-y-10">
				<Input
					type="text"
					placeholder="Company Name"
					label="Company Name"
					labelPlacement="outside"
					className="font-bold"
					name="companyName"
					value={data.companyName}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Contract ID"
					label="Contract ID"
					labelPlacement="outside"
					className="font-bold"
					name="contractId"
					value={data.contractId}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Registration ID"
					label="Registration ID"
					labelPlacement="outside"
					className="font-bold"
					name="regId"
					value={data.regId}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<div className="flex flex-col space-y-2">
					<span className="font-bold text-sm">Registration Date</span>
					<DatePicker
						name="regDate"
						value={data.regDate}
						onChange={(newValue) => {
							setData((p) => ({
								...p,
								regDate: dayjs(newValue).unix(),
							}));
						}}
					/>
				</div>
				<Input
					type="text"
					placeholder="TIN Number"
					label="TIN Number"
					labelPlacement="outside"
					className="font-bold"
					name="tin"
					value={data.tin}
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
					name="contactNumber"
					value={data.contactNumber}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Workforce Size"
					label="Workforce Size"
					labelPlacement="outside"
					className="font-bold"
					name="workforceSize"
					value={data.workforceSize}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Payment per tonnage of waste"
					label="Payment per tonnage of waste"
					labelPlacement="outside"
					className="font-bold"
					name="paymentPerTon"
					value={data.paymentPerTon}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Required amount of waste per day"
					label="Required amount of waste per day"
					labelPlacement="outside"
					className="font-bold"
					name="requiredAmountWastePerDay"
					value={data.requiredAmountWastePerDay}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Contract duration"
					label="Contract duration"
					labelPlacement="outside"
					className="font-bold"
					name="contractDurationInMonth"
					value={data.contractDurationInMonth}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Area of collection"
					label="Area of collection"
					labelPlacement="outside"
					className="font-bold"
					name="areaOfCollection"
					value={data.areaOfCollection}
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
