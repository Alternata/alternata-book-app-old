import { Button, Text, TouchableOpacity, View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import usePatient from "../../hooks/usePatient";

export default function ProfileScreen({}: {}) {
  const { clearSession } = useAuth0();
  const { patient } = usePatient();
  return (
    <View className="p-6">
      <View className="p-4 bg-white rounded-md shadow-sm">
        <Text className="font-bold">
          {patient.first_name} {patient.last_name}
        </Text>
      </View>
      <TouchableOpacity
        className="mt-4 p-4 bg-indigo-500 rounded-md shadow-sm"
        onPress={clearSession}
      >
        <Text className="text-white font-bold text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
