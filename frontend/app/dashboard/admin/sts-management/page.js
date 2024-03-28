import EmailIcon from "@/icon/EmailIcon";
import { Button, Input } from "@nextui-org/react";
import React from "react";

const page = () => {
	return (
		<div className="w-full flex justify-center items-center">
			<div className="w-4/5">
				<div className="w-full rounded overflow-hidden  border-2 border-[#150038]">
					<div className="w-full text-white bg-[#150038] flex items-center px-2 justify-between">
						<EmailIcon />
						<div className="text-white font-bold text-2xl">
							Email
						</div>
					</div>
					<div className="w-full p-2">
						<span className="text-xl font-semibold">"ABC"</span>
						<div className="flex space-x-2 font-bold">
							<Input
								disabled
								// value={user?.email}
								placeholder="Email address"
							/>
							<Button disabled color="primary">
								Update
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
