"use client";
import { Button, Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { usePDF } from "react-to-pdf";

const contractors = [
	{ label: "ABC Company", value: 1 },
	{ label: "DEF Company", value: 2 },
];

const page = () => {
	const [data, setData] = useState({});
	const { toPDF, targetRef } = usePDF({
		filename: `bill_${dayjs(new Date()).unix()}.pdf`,
	});

	return (
		<div className="w-full flex justify-center flex-col items-center">
			<div className="w-full lg:w-3/4 p-4">
				<div className="w-full text-center font-bold text-2xl border-b-2 border-green-300">
					Bill Generation
				</div>
				<div className="p-4 mt-4 w-full">
					<Select
						placeholder="Select Contractor"
						labelPlacement="outside"
						label="Select Contractor"
						className="py-0 mt-0 font-bold"
						name="companyName"
						onChange={(e) => {
							setData((prevData) => ({
								...prevData,
								[e.target.name]: e.target.value,
							}));
						}}
					>
						A
						{contractors.map((type) => (
							<SelectItem
								className="text-slate-900"
								key={type.value}
								value={type.value}
							>
								{type.label}
							</SelectItem>
						))}
					</Select>
					<div className="mt-4 bg-white p-8 w-full items-center justify-center flex flex-col" ref={targetRef}>
                        <div className="font-bold text-2xl my-2 pb-2">Contractor Bill</div>
						<div className="w-full border border-slate-600 rounded-xl p-3">
							<p className="font-bold text-lg border-b pb-2 border-slate-400">
								Basic Information:
							</p>
							<div className="w-full flex font-bold">
								<div className="w-[400px]">Company name:</div>
								<div className="w-1/2">ABC Company</div>
							</div>
							<div className="w-full flex font-bold">
								<div className="w-[400px]">
									Registration Number:
								</div>
								<div className="w-1/2">REG-8215</div>
							</div>
							<div className="w-full flex font-bold">
								<div className="w-[400px]">Contractor ID:</div>
								<div className="w-1/2">CID-752</div>
							</div>
							<div className="w-full flex font-bold">
								<div className="w-[400px]">Billing Date:</div>
								<div className="w-1/2">May 11, 2024</div>
							</div>

							<p className="mt-4 font-bold text-lg border-b pb-2 border-slate-400">
								Bill Summary:
							</p>
							<div className="pb-2 w-full">
								<div className="w-full flex font-bold">
									<div className="w-[400px]">
										Weight of waste:
									</div>
									<div className="w-1/2">100 ton(s)</div>
								</div>
								<div className="w-full flex font-bold">
									<div className="w-[400px]">
										Required weight of waste:
									</div>
									<div className="w-1/2">120 ton(s)</div>
								</div>
								<div className="w-full flex font-bold">
									<div className="w-[400px]">
										Payment per tonnage of waste:
									</div>
									<div className="w-1/2">30 Tk</div>
								</div>
								<div className="w-full flex pb-4 font-bold border-b border-slate-400">
									<div className="w-[400px]">
										Fine rate per ton of waste:
									</div>
									<div className="w-1/2">5 Tk</div>
								</div>

								<div className="w-full flex font-bold mt-2">
									<div className="w-[400px]">Basic pay:</div>
									<div className="w-1/2">3000 Tk</div>
								</div>
								<div className="w-full flex font-bold">
									<div className="w-[400px]">Deficit:</div>
									<div className="w-1/2">20 ton(s)</div>
								</div>
								<div className="w-full flex font-bold border-b pb-2 border-slate-400">
									<div className="w-[400px]">Total fine:</div>
									<div className="w-1/2">100 Tk</div>
								</div>

								<div className="w-full flex font-bold">
									<div className="w-[400px]">Total bill:</div>
									<div className="w-1/2">2900 Tk</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button
					onClick={() => toPDF()}
					size="lg"
					color="success"
					className="text-white w-full mt-4"
				>
					Download As PDF
				</Button>
			</div>
		</div>
	);
};

export default page;
