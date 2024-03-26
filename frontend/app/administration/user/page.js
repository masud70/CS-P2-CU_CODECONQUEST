"use client";

import {
	Accordion,
	AccordionItem,
	Button,
	Divider,
	Input,
} from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
	const [users, setUsers] = useState([]);
	const [createEmail, setCreateEmail] = useState("");
	const [updateEmail, setUpdateEmail] = useState("");
	const [deleteEmail, setDeleteEmail] = useState("");
	const [cLoading, setCLoading] = useState(false);
	const [uLoading, setULoading] = useState(false);
	const [dLoading, setDLoading] = useState(false);
	const validKeys = ["email", "name"];
	const defaultContent =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

	const createUser = async () => {
		try {
			setCLoading(true);
			const result = await axios({
				url: `${process.env.backendUrl}/users`,
				method: "POST",
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: {
					email: createEmail,
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			toast.success(result.data.message);
			setCreateEmail("");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setCLoading(false);
		}
	};
	const getAllUsers = async () => {
		try {
			const result = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/users`,
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
			});

			console.log(result);
			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			setUsers(result.data.users);
		} catch (error) {
			console.log(error.message);
		}
	};

	const deleteUser = async () => {
		try {
			setCLoading(true);
			const result = await axios({
				url: `${process.env.backendUrl}/users`,
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: {
					email: createEmail,
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			toast.success(result.data.message);
			setCreateEmail("");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setCLoading(false);
		}
	};
	const userItem = (user) => {
		const item = Object.entries(user).map(([key, value]) =>
			validKeys.includes(key) ? (
				<div key={key}>
					<span>{key} :</span>
					<span>{value}</span>
				</div>
			) : null
		);

		return item;
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<div className="flex flex-col space-y-2 w-full">
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="h-[150px] rounded bg-slate-500">
					<div className="text-xl font-bold text-center py-4">
						Create New User
					</div>
					<Divider className="w-full" />
					<div className="w-full flex space-x-2 p-2">
						<Input
							size="sm"
							type="email"
							label="Email"
							value={createEmail}
							onValueChange={setCreateEmail}
						/>
						<Button
							size="lg"
							color="primary"
							onClick={createUser}
							isLoading={cLoading}
						>
							Create
						</Button>
					</div>
				</div>
				<div className="h-[150px] rounded bg-slate-500">
					<div className="text-xl font-bold text-center py-4">
						Update User
					</div>
					<Divider className="w-full" />
					<div className="w-full flex space-x-2 p-2">
						<Input
							size="sm"
							type="email"
							label="Email / Phone Number"
						/>
						<Button size="lg" color="primary">
							Search
						</Button>
					</div>
				</div>

				<div className="h-[150px] rounded bg-slate-500">
					<div className="text-xl font-bold text-center py-4">
						Delete User
					</div>
					<Divider className="w-full" />
					<div className="w-full flex space-x-2 p-2">
						<Input
							size="sm"
							type="email"
							label="Email / Phone Number"
						/>
						<Button size="lg" color="danger">
							Delete
						</Button>
					</div>
				</div>
			</div>
			<div className="w-full">
				<div className="w-full text-center font-bold text-3xl">
					{" "}
					All Users
				</div>
				<Divider className="w-full" />
				<div className="rounded overflow-hidden">
					<Accordion className="p-0">
						{users.map((user, idx) => (
							<AccordionItem
								key={idx}
								aria-label="Accordion 1"
								title={user.email}
								className="bg-slate-400 mb-2 px-2 rounded w-full font-bold text-lg text-slate-800"
							>
								<div className="bg-slate-300 p-2 w-full flex space-x-2 flex-row rounded font-normal">
									<div className="w-3/5">
										{userItem(user)}
									</div>
									<div className="w-2/5 grid gap-3 text-center">
                                        <div className="bg-purple-500 rounded min-h-[50px]">Action 1</div>
                                        <div className="bg-red-500 rounded min-h-[50px]">Action 2</div>
                                        <div className="bg-sky-500 rounded min-h-[50px]">Action 2</div>
                                    </div>
								</div>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default page;
