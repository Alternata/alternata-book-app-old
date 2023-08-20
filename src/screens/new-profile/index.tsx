import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import usePatient from "../../hooks/usePatient";
import useAxios from "../../hooks/useAxios";

export default function NewProfileScreen({}: {}) {
  const [section, setSection] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("2003-01-19");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressPostalCode, setAddressPostalCode] = useState("");

  const [contactNo, setContactNo] = useState("");
  const [occupation, setOccupation] = useState("");
  const [bloodType, setBloodType] = useState("");

  const { mutate } = usePatient();
  const { post } = useAxios();

  async function handleSubmit() {
    try {
      await post("/patient/profile", {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        gender: gender,
        weight: parseFloat(weight),
        height: parseFloat(height),
        address: {
          street: addressStreet,
          city: addressCity,
          state: addressState,
          postal_code: addressPostalCode,
        },
        contact_no: contactNo,
        occupation: occupation,
        blood_type: bloodType,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  if (section === 0)
    return (
      <SafeAreaView className="w-full h-full bg-yellow-50">
        <View className="flex flex-col h-full p-8">
          <Text className="text-black text-2xl font-bold">Patient Details</Text>
          <View className="flex-1 my-8 space-y-4">
            <View>
              <Text className="text-black">First Name</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View>
              <Text className="text-black">Last Name</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View>
              <Text className="text-black">Date of Birth</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
            </View>
            <View>
              <Text className="text-black">Gender</Text>
              <View className="mt-2 flex flex-row space-x-2">
                <TouchableOpacity
                  className={`p-4 flex-1 border-2 border-black ${
                    gender === "male" ? "bg-black" : ""
                  }`}
                  onPress={() => setGender("male")}
                >
                  <Text
                    className={`font-bold text-center ${
                      gender === "male" ? "text-white" : "text-black"
                    }`}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`p-4 flex-1 border-2 border-black ${
                    gender === "female" ? "bg-black" : ""
                  }`}
                  onPress={() => setGender("female")}
                >
                  <Text
                    className={`font-bold text-center ${
                      gender === "female" ? "text-white" : "text-black"
                    }`}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="relative">
              <Text className="text-black">Weight</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                // TODO: finalize keyboardType or inputMode
                keyboardType="numbers-and-punctuation"
                value={weight}
                onChangeText={setWeight}
              />
              <Text className="absolute bottom-4 right-4">kg</Text>
            </View>
            <View className="relative">
              <Text className="text-black">Height</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                // TODO: finalize keyboardType or inputMode
                keyboardType="number-pad"
                value={height}
                onChangeText={setHeight}
              />
              <Text className="absolute bottom-4 right-4">cm</Text>
            </View>
          </View>
          <TouchableOpacity
            className="mt-2 p-4 bg-black border-2 border-black"
            onPress={() => setSection(1)}
          >
            <Text className="text-white font-bold text-center">Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  else if (section === 1)
    return (
      <SafeAreaView className="w-full h-full bg-yellow-50">
        <View className="flex flex-col h-full p-8">
          <Text className="text-black text-2xl font-bold">
            Address Information
          </Text>
          <View className="flex-1 my-8 space-y-4">
            <View>
              <Text className="text-black">Street</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={addressStreet}
                onChangeText={setAddressStreet}
              />
            </View>
            <View>
              <Text className="text-black">City</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={addressCity}
                onChangeText={setAddressCity}
              />
            </View>
            <View>
              <Text className="text-black">State</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={addressState}
                onChangeText={setAddressState}
              />
            </View>
            <View>
              <Text className="text-black">Postal Code</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                // TODO: finalize keyboardType or inputMode
                inputMode="numeric"
                value={addressPostalCode}
                onChangeText={setAddressPostalCode}
              />
            </View>
          </View>
          <TouchableOpacity
            className="mt-2 p-4 border-2 border-black"
            onPress={() => setSection(0)}
          >
            <Text className="text-black font-bold text-center">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-2 p-4 bg-black border-2 border-black"
            onPress={() => setSection(2)}
          >
            <Text className="text-white font-bold text-center">Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  else if (section === 2)
    return (
      <SafeAreaView className="w-full h-full bg-yellow-50">
        <View className="flex flex-col h-full p-8">
          <Text className="text-black text-2xl font-bold">
            Other Information
          </Text>
          <View className="flex-1 my-8 space-y-4">
            <View>
              <Text className="text-black">Contact No.</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={contactNo}
                onChangeText={setContactNo}
              />
            </View>
            <View>
              <Text className="text-black">Occupation</Text>
              <TextInput
                className="mt-2 p-4 border-2 border-black"
                value={occupation}
                onChangeText={setOccupation}
              />
            </View>
            <View>
              <Text className="text-black">Blood Type</Text>
              <View className="mt-2 flex flex-row space-x-2">
                {["A+", "B+", "AB+", "O+"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    className={`p-4 flex-1 border-2 border-black ${
                      bloodType === item ? "bg-black" : ""
                    }`}
                    onPress={() => setBloodType(item)}
                  >
                    <Text
                      className={`font-bold text-center ${
                        bloodType === item ? "text-white" : "text-black"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="mt-2 flex flex-row space-x-2">
                {["A-", "B-", "AB-", "O-"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    className={`p-4 flex-1 border-2 border-black ${
                      bloodType === item ? "bg-black" : ""
                    }`}
                    onPress={() => setBloodType(item)}
                  >
                    <Text
                      className={`font-bold text-center ${
                        bloodType === item ? "text-white" : "text-black"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="mt-2 p-4 border-2 border-black"
            onPress={() => setSection(1)}
          >
            <Text className="text-black font-bold text-center">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-2 p-4 bg-black border-2 border-black"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-center">Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}
