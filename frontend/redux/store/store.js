import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../state/authSlice";

export default configureStore({
	reducer: {
		auth: authSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
