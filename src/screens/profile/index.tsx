import { Button, Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function ProfileScreen({}: {}) {
  const { clearSession } = useAuth0();
  return (
    <View>
      <Text className="text-black">Profile</Text>
      <Button title="Logout" onPress={clearSession} />
    </View>
  );
}
