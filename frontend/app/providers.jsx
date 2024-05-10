// app/providers.tsx
"use client";

import store from "@/redux/store/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { APIProvider } from "@vis.gl/react-google-maps";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
let persistor = persistStore(store);

export function Providers({ children }) {
	return (
		<NextUIProvider>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<APIProvider apiKey={process.env.gmapApi}>
							{children}
						</APIProvider>
					</LocalizationProvider>
				</PersistGate>
			</Provider>
		</NextUIProvider>
	);
}
