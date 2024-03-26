"use client";

import React, { useEffect, useState } from "react";
import "./forgotPass.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ATextField from "../../../components/ATextField";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { hasCookie } from "cookies-next";
import { useSelector } from "react-redux";

export default function Page() {
	const [otp, setOtp] = useState("");
	const [errorMessaage, setErrorMessaage] = useState("");
	const [loading, setLoading] = useState(false);
    const auth = useSelector((st) => st.auth);
	const { email } = useParams();
	const router = useRouter();

    useEffect(() => {
		if (hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

	const submitOtp = async () => {
		try {
			setErrorMessaage("");
			setLoading(true);

			const result = await axios.post(
				`${process.env.backendUrl}/auth/reset-password/confirm`,
				{
					emailOrMobileNumber: email,
					code: otp,
				}
			);

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			toast.success(result.data.message);
			router.push("/auth/login");
		} catch (error) {
			toast.error(error.message);
			setErrorMessaage(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box className="inputDiv">
			<div className="text-3xl w-full text-center pb-[15px] text-[wheat]">
				Reset Password
			</div>
			<Box>
				<ATextField
					type={"text"}
					label={"OTP"}
					setFunction={setOtp}
					value={otp}
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
					size="lg"
					color="primary"
					isLoading={loading}
					onClick={submitOtp}
				>
					Submit OTP
				</Button>
			</Box>
		</Box>
	);
}
