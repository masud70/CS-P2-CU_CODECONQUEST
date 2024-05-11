import DeleteIcon from "@/icon/DeleteIcon";
import UpdateIcon from "@/icon/UpdateIcon";
import React from "react";

const page = () => {
	const plans = [
		{
			planId: 1,
			area: "Area 1",
			startTime: "08:00 AM",
			duration: "5 hours",
		},
		{
			planId: 2,
			area: "Area 2",
			startTime: "09:00 AM",
			duration: "4 hours",
		},
		{
			planId: 3,
			area: "Area 3",
			startTime: "08:30 AM",
			duration: "6 hours",
		},
		{
			planId: 4,
			area: "Area 4",
			startTime: "08:00 AM",
			duration: "6:30 hours",
		},
	];
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<div className="w-full font-bold text-2xl text-center my-3">
				Manage Collection Plan(s)
			</div>
			<div className="w-full max-w-[700px] border border-slate-300 rounded-lg">
				<div className="flex justify-between items-center px-4 font-bold bg-slate-200 py-2">
					<div className="flex-1">Plan ID</div>
					<div className="flex-1">Area</div>
					<div className="flex-1">Start Time</div>
					<div className="flex-1">Duration</div>
					<div className="flex-1">Action</div>
				</div>
				{plans.map((plan, idx) => (
					<div
						className={`flex justify-between items-center py-2 px-4 ${
							idx % 2 && "bg-slate-200"
						}`}
						key={idx}
					>
						<div className="flex-1">{plan.planId}</div>
						<div className="flex-1">{plan.area}</div>
						<div className="flex-1">{plan.startTime}</div>
						<div className="flex-1">{plan.duration}</div>
						<div className="flex-1">
							<div className="flex w-full space-x-2 flex-row">
								<DeleteIcon />
								<UpdateIcon />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default page;
