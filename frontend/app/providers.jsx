// app/providers.tsx
"use client";

import store from "@/redux/store/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from 'react-redux';

export function Providers({ children }) {
	return <NextUIProvider><Provider store={store}>{children}</Provider></NextUIProvider>;
}
