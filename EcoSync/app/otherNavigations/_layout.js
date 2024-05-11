import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="settings/index" options={{ headerShown: false }} />
				<Stack.Screen name="events/index" options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default RootLayout;

const styles = StyleSheet.create({});
