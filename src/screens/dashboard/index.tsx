import { Text, View } from "react-native";
import usePatient from "../../hooks/usePatient";

export default function DashboardScreen({}: {}) {
  const { patient } = usePatient();
  return (
    <View className="p-6">
      <Text className="text-black text-lg font-bold text-center">
        Hello, {patient.first_name}!
      </Text>
    </View>
  );
}
