import { Text, View } from "react-native";
import useClinics from "../../hooks/useClinics";

export default function NewAppointmentScreen({}: {}) {
  const { data: clinics } = useClinics();

  return (
    <View className="p-6">
      <Text className="font-bold">New Appointment</Text>
      <Text>{JSON.stringify(clinics)}</Text>
    </View>
  );
}
