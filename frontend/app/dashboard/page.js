import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div className="w-full bg-green-200 h-screen justify-center text-center items-center flex flex-col space-y-3">
			<div className="font-bold text-3xl">This is common Dashboard</div>
			<div className="font-bold w-[220px] text-2xl border-2 rounded border-green-400 px-2 bg-fuchsia-200">
				<Link href="/dashboard/admin">System Admin</Link>
			</div>
			<div className="font-bold w-[220px] text-2xl border-2 rounded border-green-400 px-2 bg-fuchsia-200">
				<Link href="/dashboard/sts">STS Manager</Link>
			</div>
			<div className="font-bold w-[220px] text-2xl border-2 rounded border-green-400 px-2 bg-fuchsia-200">
				<Link href="/dashboard/landfill">Landfill Manager</Link>
			</div>
		</div>
	);
};

export default page;
