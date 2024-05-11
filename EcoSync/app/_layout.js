import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />

				<Stack.Screen name="authentication" options={{ headerShown: false }} />
				<Stack.Screen name="home" options={{ headerShown: false }} />
				<Stack.Screen name="components" options={{ headerShown: false }} />
				<Stack.Screen name="otherNavigations" options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default RootLayout;

const styles = StyleSheet.create({});
