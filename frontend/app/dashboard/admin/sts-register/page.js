"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	const addSts = async () => {
		try {
			setLoading(true);
			const res = await axios({
				method: "POST",
				url: `${process.env.backendUrl}/admin/add-sts`,
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
				STS Register
			</div>
			<Divider />
			<div className="my-2 py-2 w-4/5 flex flex-col space-y-10">
				<Input
					type="text"
					placeholder="Location Name"
					label="Location Name"
					labelPlacement="outside"
					className="font-bold"
					name="locationName"
					value={data.locationName}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Ward Number"
					label="Ward Number"
					labelPlacement="outside"
					className="font-bold"
					name="wardNumber"
					value={data.wardNumber}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
				<Input
					type="number"
					placeholder="Capacity (Tonns)"
					label="Capacity (Tonns)"
					labelPlacement="outside"
					className="font-bold"
					name="capacity"
					value={data.capacity}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
                <Input
					type="number"
					placeholder="Latitude"
					label="Latitude"
					labelPlacement="outside"
					className="font-bold"
					name="lat"
					value={data.lat}
					onChange={(e) => {
						setData((prevData) => ({
							...prevData,
							[e.target.name]: e.target.value,
						}));
					}}
				/>
                <Input
					type="number"
					placeholder="Longitude"
					label="Longitude"
					labelPlacement="outside"
					className="font-bold"
					name="lng"
					value={data.lng}
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
					onClick={addSts}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default page;
