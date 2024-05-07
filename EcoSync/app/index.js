import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	return <Redirect href="/admin" />;
	return (
		<SafeAreaView>
			<View className="flex justify-center items-center h-screen bg-indigo-950 text-white">
				<Text className="text-white font-bold text-2xl">
					Welcome to CODE SAMURAI 2024
				</Text>
				<Link
					className="border-2 rounded-xl px-4 py-2 w-40 text-center font-bold text-white bg-green-400 mt-4"
					href="/dashboard"
				>
					Dashboard
				</Link>
				<Link
					className="border-2 rounded-xl px-4 py-2 w-40 text-center font-bold text-white bg-green-400 mt-4"
					href="/admin"
				>
					Admin
				</Link>
			</View>
		</SafeAreaView>
	);
}
