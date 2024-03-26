import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: hasCookie(process.env.tokenKey),
		token: getCookie(process.env.tokenKey),
		user: {},
	},
	reducers: {
		login: (state, action) => {
			state.status = true;
			if (action.payload.user) {
				state.user = action.payload.user;
			}
			if (action.payload.token) {
				state.token = action.payload.token;
				setCookie(process.env.tokenKey, action.payload.token);
			}
			toast.success("Login successful.");
		},

		logout: (state) => {
			deleteCookie(process.env.tokenKey);
			state.status = false;
			state.user = {};
			toast.success("Logout successful.");
		},

		setAuthUserData: (state, action) => {
			if (action.payload.user) {
				state.userData = action.payload.user;
			}
		},
	},
});

export const { login, logout, setAuthUserData } = authSlice.actions;
export default authSlice.reducer;
