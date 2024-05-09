import Link from "next/link";
import React from "react";

const MenuCard = ({ text, icon, className, link }) => {
	return (
		<Link
			href={link}
			className="bg-green-500 text-white mx-[10px] p-2 rounded-xl"
			style={{
				boxShadow: "0px 2px 5px black",
			}}
		>
			<div
				className={
					"flex flex-col items-center justify-center h-[120px] rounded overflow-hidden cursor-pointer " +
					className
				}
			>
				<div className="text-xl font-bold text-center w-full">
					{text}
				</div>
				{icon}
			</div>
		</Link>
	);
};

export default MenuCard;
