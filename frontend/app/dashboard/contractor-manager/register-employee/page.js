"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({
		dob: dayjs(new Date()).unix(),
		dateOfHire: dayjs(new Date()).unix(),
	});
	const [loading, setLoading] = useState(false);

	const registerEmployee = async () => {
		try {
			setLoading(true);
			const res = await axios({
				method: "POST",
				url: `${process.env.backendUrl}/contractorManager/employee-register`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: data,
			});

			if (!res.data.success) {
				throw new Error(res.data.message);
			}
			toast.success(res.data.message);
			setData({
				dob: dayjs(new Date()).unix(),
				dateOfHire: dayjs(new Date()).unix(),
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full flex flex-col justify-center items-center space-y-3">
			<div className="font-bold text-3xl text-center py-3">
				Employee Registration
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
					placeholder="Employee ID"
					label="Employee ID"
					labelPlacement="outside"
					className="font-bold"
					name="employeeId"
					value={data.employeeId}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<div className="flex flex-col space-y-2">
					<span className="font-bold text-sm">Date of Birth</span>
					<DatePicker
						name="dob"
						value={dayjs.unix(data.dob)}
						onChange={(newValue) => {
							setData((p) => ({
								...p,
								dob: dayjs(newValue).unix(),
							}));
						}}
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<span className="font-bold text-sm">Date of Hire</span>
					<DatePicker
						name="dateOfHire"
						value={dayjs.unix(data.dateOfHire)}
						onChange={(newValue) => {
							setData((p) => ({
								...p,
								dateOfHire: dayjs(newValue).unix(),
							}));
						}}
					/>
				</div>
				<Input
					type="text"
					placeholder="Job Title"
					label="Job Title"
					labelPlacement="outside"
					className="font-bold"
					name="jobTitle"
					value={data.jobTitle}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Payment rate per hour"
					label="Payment rate per hour"
					labelPlacement="outside"
					className="font-bold"
					name="paymentRatePerHour"
					value={data.paymentRatePerHour}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Contact information"
					label="Contact information"
					labelPlacement="outside"
					className="font-bold"
					name="contactInfo"
					value={data.contactInfo}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="text"
					placeholder="Assigned Collection Route"
					label="Assigned Collection Route"
					labelPlacement="outside"
					className="font-bold"
					name="assignedCollectionRoute"
					value={data.assignedCollectionRoute}
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
					onClick={registerEmployee}
				>
					Register
				</Button>
			</div>
		</div>
	);
};

export default page;
