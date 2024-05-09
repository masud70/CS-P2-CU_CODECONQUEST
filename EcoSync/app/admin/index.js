import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const index = () => {
	const [data, setData] = useState({});

	const callApi = async () => {
		try {
			const res = await axios.get(
				`${process.env.EXPO_PUBLIC_BACKENDURL}/mobile-api`
			);
			console.log(res.data);
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		callApi();
	}, []);

	return (
		<ScrollView>
			<View className="bg-indigo-950 flex items-center justify-center">
				<Text className="text-white">Admin page</Text>
				<Text className="text-white">{data.message}</Text>
			</View>
		</ScrollView>
	);
};

export default index;

const styles = StyleSheet.create({});
