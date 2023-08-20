import { Text, View } from "react-native";

export default function LoadingScreen({}: {}) {
  return (
    <View
      className="w-full h-full bg-white
        flex items-center justify-center"
    >
      <Text className="text-lg font-bold text-black">Alternata Book</Text>
      <Text className="mt-4 text-black">Loading...</Text>
    </View>
  );
}
