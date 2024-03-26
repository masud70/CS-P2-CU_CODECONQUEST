"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import "./login.css";
import Link from "next/link";
import ATextField from "../components/ATextField";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/state/authSlice";
import { hasCookie } from "cookies-next";

export default function Login() {
	const [emailOrMobile, setEmailOrMobile] = useState("");
	const [password, setpassword] = useState("");
	const [errorMessaage, seterrorMessaage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();
	const auth = useSelector((st) => st.auth);

	useEffect(() => {
		if (hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

	const submitLogin = async () => {
		try {
			setIsLoading(true);
			const result = await axios.post(
				`${process.env.backendUrl}/auth/login`,
				{
					emailOrMobileNumber: emailOrMobile,
					password: password,
				}
			);

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			if (result.data.success) {
				setEmailOrMobile("");
				setpassword("");
				dispatch(
					login({ token: result.data.token, user: result.data.user })
				);
				router.push("/dashboard");
			}
		} catch (error) {
			seterrorMessaage(error.message);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box className="inputDiv">
			<div className="text-3xl w-full text-center p-[15px] text-[wheat]">
				Log In
			</div>
			<Box>
				<ATextField
					type={"text"}
					label={"Email / Mobile Number"}
					setFunction={setEmailOrMobile}
					value={emailOrMobile}
				/>

				<ATextField
					type={"password"}
					label={"Password"}
					setFunction={setpassword}
					value={password}
				/>
			</Box>
			<Box className="errorMessageDiv">
				{errorMessaage.length > 0 && (
					<Typography className="errorMessageText">
						** {errorMessaage} **
					</Typography>
				)}
			</Box>
			<Box className="forgotPasswordDiv">
				<Link
					href={"/auth/forgot-password"}
					className="forgotPasswordLink"
				>
					Forgot Password?
				</Link>
			</Box>
			<Box className="SubmitButtonDiv pt-2">
				<Button
					isLoading={isLoading}
					disabled={!emailOrMobile.length || !password.length}
					size="lg"
					color="primary"
					onClick={submitLogin}
				>
					Submit
				</Button>
			</Box>
		</Box>
	);
}
