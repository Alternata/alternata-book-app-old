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

  const [errors, setErrors] = useState<any>({});

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
    } catch (e: any) {
      const { errors } = e.response.data;
      setErrors(errors);
    }
  }

  if (section === 0)
    return (
      <SafeAreaView className="w-full h-full">
        <View className="flex flex-col h-full p-6">
          <Text className="text-black text-md font-bold">Patient Details</Text>
          <View className="flex-1 my-6 space-y-4">
            <View>
              <Text className={errors["first_name"] ? "text-red-500" : ""}>
                First Name
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View>
              <Text className={errors["last_name"] ? "text-red-500" : ""}>
                Last Name
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View>
              <Text className={errors["date_of_birth"] ? "text-red-500" : ""}>
                Date of Birth
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
            </View>
            <View>
              <Text className={errors["gender"] ? "text-red-500" : ""}>
                Gender
              </Text>
              <View className="mt-2 flex flex-row space-x-2">
                <TouchableOpacity
                  className={`p-4 flex-1 rounded-md shadow-sm ${
                    gender === "male" ? "bg-indigo-500" : "bg-white"
                  }`}
                  onPress={() => setGender("male")}
                >
                  <Text
                    className={`font-bold text-center ${
                      gender === "male" ? "text-white" : "text-indigo-500"
                    }`}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`p-4 flex-1 rounded-md shadow-sm ${
                    gender === "female" ? "bg-indigo-500" : "bg-white"
                  }`}
                  onPress={() => setGender("female")}
                >
                  <Text
                    className={`font-bold text-center ${
                      gender === "female" ? "text-white" : "text-indigo-500"
                    }`}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="relative">
              <Text className={errors["weight"] ? "text-red-500" : ""}>
                Weight
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                // TODO: finalize keyboardType or inputMode
                keyboardType="numbers-and-punctuation"
                value={weight}
                onChangeText={setWeight}
              />
              <Text className="absolute bottom-4 right-4">kg</Text>
            </View>
            <View className="relative">
              <Text className={errors["height"] ? "text-red-500" : ""}>
                Height
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                // TODO: finalize keyboardType or inputMode
                keyboardType="number-pad"
                value={height}
                onChangeText={setHeight}
              />
              <Text className="absolute bottom-4 right-4">cm</Text>
            </View>
          </View>
          <TouchableOpacity
            className="mt-2 p-4 bg-indigo-500 rounded-md shadow-sm"
            onPress={() => setSection(1)}
          >
            <Text className="text-white font-bold text-center">Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  else if (section === 1)
    return (
      <SafeAreaView className="w-full h-full">
        <View className="flex flex-col h-full p-6">
          <Text className="text-black text-md font-bold">
            Address Information
          </Text>
          <View className="flex-1 my-6 space-y-4">
            <View>
              <Text className={errors["address.street"] ? "text-red-500" : ""}>
                Street
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={addressStreet}
                onChangeText={setAddressStreet}
              />
            </View>
            <View>
              <Text className={errors["address.city"] ? "text-red-500" : ""}>
                City
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={addressCity}
                onChangeText={setAddressCity}
              />
            </View>
            <View>
              <Text className={errors["address.state"] ? "text-red-500" : ""}>
                State
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={addressState}
                onChangeText={setAddressState}
              />
            </View>
            <View>
              <Text
                className={errors["address.postal_code"] ? "text-red-500" : ""}
              >
                Postal Code
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                // TODO: finalize keyboardType or inputMode
                inputMode="numeric"
                value={addressPostalCode}
                onChangeText={setAddressPostalCode}
              />
            </View>
          </View>
          <TouchableOpacity
            className="mt-2 p-4 bg-white shadow-sm rounded-md"
            onPress={() => setSection(0)}
          >
            <Text className="text-indigo-500 font-bold text-center">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-2 p-4 bg-indigo-500 rounded-md shadow-sm"
            onPress={() => setSection(2)}
          >
            <Text className="text-white font-bold text-center">Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  else if (section === 2)
    return (
      <SafeAreaView className="w-full h-full">
        <View className="flex flex-col h-full p-6">
          <Text className="text-black text-md font-bold">
            Other Information
          </Text>
          <View className="flex-1 my-6 space-y-4">
            <View>
              <Text className={errors["contact_no"] ? "text-red-500" : ""}>
                Contact No.
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={contactNo}
                onChangeText={setContactNo}
              />
            </View>
            <View>
              <Text className={errors["occupation"] ? "text-red-500" : ""}>
                Occupation
              </Text>
              <TextInput
                className="mt-2 p-4 bg-white shadow-sm rounded-md"
                value={occupation}
                onChangeText={setOccupation}
              />
            </View>
            <View>
              <Text className={errors["blood_type"] ? "text-red-500" : ""}>
                Blood Type
              </Text>
              <View className="mt-2 flex flex-row space-x-2">
                {["A+", "B+", "AB+", "O+"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    className={`p-4 flex-1 rounded-md shadow-sm ${
                      bloodType === item ? "bg-indigo-500" : "bg-white"
                    }`}
                    onPress={() => setBloodType(item)}
                  >
                    <Text
                      className={`font-bold text-center ${
                        bloodType === item ? "text-white" : "text-indigo-500"
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
                    className={`p-4 flex-1 rounded-md shadow-sm ${
                      bloodType === item ? "bg-indigo-500" : "bg-white"
                    }`}
                    onPress={() => setBloodType(item)}
                  >
                    <Text
                      className={`font-bold text-center ${
                        bloodType === item ? "text-white" : "text-indigo-500"
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
            className="mt-2 p-4 bg-white shadow-sm rounded-md"
            onPress={() => setSection(1)}
          >
            <Text className="text-indigo-500 font-bold text-center">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-2 p-4 bg-indigo-500 rounded-md shadow-sm"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-center">Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}
