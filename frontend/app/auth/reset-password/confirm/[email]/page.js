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
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/state/authSlice";

export default function Page() {
	const [otp, setOtp] = useState("");
	const [errorMessaage, setErrorMessaage] = useState("");
	const [loading, setLoading] = useState(false);
	const auth = useSelector((st) => st.auth);
	const dispatch = useDispatch();
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

			console.log(result.data);

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			toast.success(result.data.message);
			dispatch(
				login({ token: result.data.token, user: result.data.user })
			);
			router.push("/dashboard");
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
					className="SubmitButton"
					isLoading={loading}
					onClick={submitOtp}
				>
					Submit OTP
				</Button>
			</Box>
		</Box>
	);
}
