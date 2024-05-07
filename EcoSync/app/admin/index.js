import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
	return (
		<ScrollView>
			<View className="bg-indigo-950 flex items-center justify-center">
				<Text className="text-white">Admin page</Text>
			</View>
		</ScrollView>
	);
};

export default index;

const styles = StyleSheet.create({});
