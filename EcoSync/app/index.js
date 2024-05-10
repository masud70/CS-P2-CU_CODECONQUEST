import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Link, Redirect } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	// return <Redirect href="/admin" />;
	return (
		<SafeAreaView >
			<View className="bg-white h-screen flex justify-center items-center">
				<View>
					<Image
						style={{width:200, height:200, resizeMode:'contain',marginBottom:10}}
					source={require('../assets/logo_bg_removed.png')}/>
					<Text className="text-center py-5 text-[20px] font-semibold" >Welcome to 
						<Text style={{color:"#09D95D"}}> EcoSync</Text>
					.</Text>
				</View>

				<View className="flex justify-center items-center bg-white text-white">
					<Link className="rounded-lg px-4 py-4 w-40 text-center font-bold text-white bg-green-400"
					href={"/authentication/login"}>Login</Link>
					<Link className="rounded-lg px-4 py-4 w-40 text-center font-bold text-white bg-green-400 mt-4"
					href={"/authentication/signup"}>Sign up</Link>
				</View>
			</View>
			
		</SafeAreaView>
	);
}
