import { StyleSheet } from "react-native";
import React from "react";

import { Stack } from "expo-router";


const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="Others" options={{ headerShown: false }} />
			<Stack.Screen name="Forum" options={{ headerShown: false }} />
			<Stack.Screen name="Issue" options={{ headerShown: false }} />
			<Stack.Screen name="ApostScreen" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;

const styles = StyleSheet.create({});
