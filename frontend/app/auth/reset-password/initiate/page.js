"use client";

import React, { useEffect, useState } from "react";
import "./forgotPass.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ATextField from "../../components/ATextField";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { hasCookie } from "cookies-next";
import { useSelector } from "react-redux";

export default function Page() {
	const [emailOrMobile, setEmailOrMobile] = useState("");
	const [errorMessaage, setErrorMessaage] = useState("");
	const [loading, setLoading] = useState(false);
    const auth = useSelector((st) => st.auth);
	const router = useRouter();

    useEffect(() => {
		if (hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

	const sendOtp = async () => {
		try {
			setErrorMessaage("");
			setLoading(true);

			const result = await axios.post(
				`${process.env.backendUrl}/auth/reset-password/initiate`,
				{
					emailOrMobileNumber: emailOrMobile,
				}
			);

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			toast.success(result.data.message);
			router.push(`/auth/reset-password/confirm/${emailOrMobile}`);
		} catch (error) {
			toast.error(error.message);
			setErrorMessaage(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box className="inputDiv">
			<div className="text-3xl w-full text-left pb-[15px] text-[white]">
				Reset Password
			</div>
			<Box>
				<ATextField
					type={"text"}
					label={"Email / Mobile Number"}
					setFunction={setEmailOrMobile}
					value={emailOrMobile}
				/>
			</Box>
			<Box className="errorMessageDiv">
				{errorMessaage.length > 0 && (
					<Typography className="errorMessageText">
						** {errorMessaage} **
					</Typography>
				)}
			</Box>
			<div>
				<Button className="bg-transparent font-bold text-white">
					Send OTP again
				</Button>
			</div>
			<Box className="SubmitButtonDiv">
				<Button
				className="SubmitButton"
					isLoading={loading}
					onClick={sendOtp}
				>
					Send OTP
				</Button>
			</Box>
		</Box>
	);
}
