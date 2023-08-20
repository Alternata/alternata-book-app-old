import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useAppointments from "../../hooks/useAppointments";
import moment from "moment";

export default function AppointmentsScreen({
  navigation,
}: {
  navigation: any;
}) {
  const { appointments } = useAppointments();

  const upcomingAppointments = appointments?.filter((appointment) =>
    moment().isBefore(appointment.appointment_at)
  );
  const pastAppointments = appointments?.filter((appointment) =>
    moment().isAfter(appointment.appointment_at)
  );

  return (
    <ScrollView className="p-6">
      <TouchableOpacity
        className="mt-2 p-4 bg-indigo-500 rounded-md shadow-sm"
        onPress={() => navigation.push("New Appointment")}
      >
        <Text className="text-white font-bold text-center">
          Schedule an appointment
        </Text>
      </TouchableOpacity>

      <Text className="mt-4 text-black text-md font-bold">
        Upcoming Appointments
      </Text>
      <View className="mt-4 space-y-2">
        {appointments &&
          upcomingAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment._id}
              className="px-4 py-3 bg-white rounded-md shadow-sm"
            >
              <Text className="font-bold">
                Dr.{" "}
                {appointment.doctor.first_name || appointment.doctor.last_name}
              </Text>
              <Text className="mt-1">{appointment.clinic.name}</Text>
              <Text className="mt-1">
                {moment(appointment.appointment_at).calendar()}
              </Text>
            </TouchableOpacity>
          ))}
      </View>

      <Text className="mt-4 text-black text-md font-bold">
        Past Appointments
      </Text>
      <View className="mt-4 space-y-2">
        {appointments &&
          pastAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment._id}
              className="px-4 py-3 bg-white rounded-md shadow-sm"
            >
              <Text className="font-bold">
                Dr.{" "}
                {appointment.doctor.first_name || appointment.doctor.last_name}
              </Text>
              <Text className="mt-1">{appointment.clinic.name}</Text>
              <Text className="mt-1">
                {moment(appointment.appointment_at).calendar()}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}
