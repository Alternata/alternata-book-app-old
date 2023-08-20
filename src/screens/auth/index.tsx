import { Button, Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function AuthScreen({}: {}) {
  const { authorize } = useAuth0();

  return (
    <View>
      <Text className="text-black">Auth</Text>
      <Button title="Login" onPress={authorize} />
    </View>
  );
}
