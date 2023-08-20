import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./src/screens/auth";
import { Auth0Provider } from "react-native-auth0";
import { useAuth0 } from "react-native-auth0";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "./src/screens/dashboard";
import AppointmentsScreen from "./src/screens/appointments";
import NewAppointmentScreen from "./src/screens/new-appointment";
import ProfileScreen from "./src/screens/profile";
import NewProfileScreen from "./src/screens/new-profile";
import LoadingScreen from "./src/screens/loading";
import usePatient from "./src/hooks/usePatient";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { useEffect } from "react";
import colors from "tailwindcss/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({}: {}) {
  return (
    <Auth0Provider
      domain={"alternata.us.auth0.com"}
      clientId={"Q4AWAUjQaRsfHSh2x52FtRkxRnitH7vQ"}
    >
      <Navigation />
    </Auth0Provider>
  );
}

function Navigation() {
  const { user, isLoading: userIsLoading } = useAuth0();
  const {
    data: patient,
    isLoading: patientIsLoading,
    mutate: mutatePatient,
  } = usePatient();

  useEffect(() => {
    if (user) mutatePatient();
  }, [user]);

  if (userIsLoading || patientIsLoading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      ) : !patient ? (
        <Stack.Navigator>
          <Stack.Screen name="New Profile" component={NewProfileScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabsNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="New Appointment"
            component={NewAppointmentScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function TabsNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerTitle: "Alternata Book",
          tabBarActiveTintColor: colors.indigo["500"],
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          tabBarActiveTintColor: colors.indigo["500"],
          tabBarIcon: ({ color, size }) => (
            <CalendarDaysIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarActiveTintColor: colors.indigo["500"],
          tabBarIcon: ({ color, size }) => (
            <UserIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
