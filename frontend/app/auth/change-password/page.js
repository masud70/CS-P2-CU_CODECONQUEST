"use client";

import { useEffect, useState } from "react";
import "./resetPassword.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ATextField from "../components/ATextField";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Page() {
	const [password, setpassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [errorMessaage, setErrorMessaage] = useState("");
	const [loading, setLoading] = useState(false);
	const auth = useSelector((st) => st.auth);
	const router = useRouter();

	useEffect(() => {
		if (!hasCookie(process.env.tokenKey)) {
			router.push("/");
		}
	}, [auth]);

	const submitResetPassword = async () => {
		try {
			setLoading(true);
			setErrorMessaage("");

			if (password !== confirmPassword) {
				throw new Error("Passwrds doesn't match");
			}

			const result = await axios({
				method: "POST",
				url: process.env.backendUrl + "/auth/change-password",
				headers: {
					authorization: "Bearer " + getCookie(process.env.tokenKey),
				},
				data: {
					newPassword: password,
				},
			});

			if (!result.data.success) {
				throw new Error(result.data.message);
			}

			toast.success(result.data.message);
			router.push("/dashboard");
			setpassword("");
			setconfirmPassword("");
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
				Change Password
			</div>
			<Box>
				<ATextField
					type={"password"}
					label={"Password"}
					setFunction={setpassword}
					value={password}
				/>
				<ATextField
					type={"password"}
					label={"Confirm Password"}
					setFunction={setconfirmPassword}
					value={confirmPassword}
				/>
			</Box>
			<Box className="errorMessageDiv">
				{errorMessaage.length > 0 && (
					<Typography className="errorMessageText">
						** {errorMessaage} **
					</Typography>
				)}
			</Box>
			<Box className="SubmitButtonDiv">
				<Button
					isLoading={loading}
					size="lg"
					color="primary"
					onClick={submitResetPassword}
				>
					Reset Password
				</Button>
			</Box>
		</Box>
	);
}
