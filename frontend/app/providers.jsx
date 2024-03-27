// app/providers.tsx
"use client";

import store from "@/redux/store/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function Providers({ children }) {
	return (
		<NextUIProvider>
			<Provider store={store}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					{children}{" "}
				</LocalizationProvider>
			</Provider>
		</NextUIProvider>
	);
}
