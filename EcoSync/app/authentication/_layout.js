import { StyleSheet, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";

import { Stack } from "expo-router";


const Layout = () => {
	return (
		<Stack>
				<Stack.Screen name="login/index" options={{ headerShown: false }} />
				<Stack.Screen name="forgotPassword/index" options={{ headerShown: false }} />
				<Stack.Screen name="signup/index" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;

const styles = StyleSheet.create({});
