"use client";

import {
	Accordion,
	AccordionItem,
	Button,
	Divider,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
	const [data, setData] = useState({});
	const [users, setUsers] = useState([]);
	const [createEmail, setCreateEmail] = useState("");
	const [cLoading, setCLoading] = useState(false);
	const [uLoading, setULoading] = useState(false);
	const [dLoading, setDLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const auth = useSelector((st) => st.auth);

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
			getAllUsers();
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

			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			setUsers(result.data.users);
		} catch (error) {
			console.log(error.message);
		}
	};

	const deleteUser = async (userId) => {
		try {
			setDLoading(true);
			const result = await axios({
				url: `${process.env.backendUrl}/users/${userId}`,
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}
			toast.success(result.data.message);
			getAllUsers();
		} catch (error) {
			toast.error(error.message);
		} finally {
			setDLoading(false);
		}
	};
	const userItem = (user) => {
		return (
			<div>
				<p>Name : {user.name || "Not set"}</p>
				<p>Email : {user.email}</p>
				<p>Mobile : {user.mobileNumber || "Not set"}</p>
				<p>
					Roles :{" "}
					{user?.Roles?.map((role, idx) => (
						<span
							key={idx}
							className="px-2 rounded-xl bg-slate-400"
						>
							{role.roleString}
						</span>
					))}
				</p>
			</div>
		);
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const roles = [
		{ label: "System admin", value: "system_admin" },
		{ label: "STS manager", value: "sts_manager" },
		{ label: "Landfill manager", value: "landfill_manager" },
		{ label: "Unassigned", value: "unassigned" },
	];

	const updateRole = async () => {
		try {
			const result = await axios({
				method: "PUT",
				url: `${process.env.backendUrl}/users/${data.user?.id}/roles`,
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
				data: {
					role: data.role,
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			toast.success(result.data.message);
			getAllUsers();
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className="flex flex-col space-y-2 w-full">
				<div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
					<div className="h-[150px] rounded bg-green-300">
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
								color="success"
								onClick={createUser}
								isLoading={cLoading}
							>
								Create
							</Button>
						</div>
					</div>

					{/* <div className="h-[150px] rounded bg-green-300">
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

					<div className="h-[150px] rounded bg-green-300">
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
					</div> */}
				</div>
				<div className="w-full">
					<div className="w-full text-center font-bold text-3xl border-b-2 mb-2 border-green-500">
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
									className="bg-green-300 mb-2 px-2 rounded w-full font-bold text-lg text-slate-800"
								>
									<div className="bg-green-100 p-2 w-full flex space-y-2 lg:space-x-2 lg:space-y-0 flex-col lg:flex-row rounded font-normal">
										<div className="w-full lg:w-3/5">
											{userItem(user)}
										</div>
										<div className="w-full lg:w-2/5 grid gap-3 text-center">
											<Button
												onClick={() => {
													onOpen();
													setData((p) => ({
														...p,
														user: user,
													}));
												}}
												color="success"
											>
												Assign Role
											</Button>
											<Button color="primary">
												Update Data
											</Button>
											<Button
												color="danger"
												onClick={() =>
													deleteUser(user.id)
												}
												isLoading={dLoading}
											>
												Delete User
											</Button>
										</div>
									</div>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</div>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Assign User Role
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="Email"
									placeholder="Enter email"
									labelPlacement="outside"
									variant="bordered"
									className="py-0 mt-0 font-bold"
									value={data.user?.email}
									disabled
								/>
								<Select
									placeholder="Select role"
									labelPlacement="outside"
									label="Select role"
									className="py-0 mt-0 font-bold"
									name="role"
									onChange={(e) => {
										setData((prevData) => ({
											...prevData,
											[e.target.name]: e.target.value,
										}));
									}}
								>
									A
									{roles.map((item) => (
										<SelectItem
											className="text-slate-900"
											key={item.value}
											value={item.value}
										>
											{item.label}
										</SelectItem>
									))}
								</Select>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="flat"
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									color="primary"
									onPress={() => updateRole()}
								>
									Submit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default page;
