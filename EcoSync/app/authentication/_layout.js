import { StyleSheet, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";

const Layout = () => {
	return (
		<View style={{backgroundColor:'white', height:'100%',width:'100%'}}>
			<Slot />
		</View>
	);
};

export default Layout;

const styles = StyleSheet.create({});
