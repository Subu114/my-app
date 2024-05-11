import {
    Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Redirect, Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";

const TakeDetails = (auth : any) => {
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const register = async () => {
    // Check if the required fields are filled out
    if (!firstName.trim()) {
      alert("Please enter your first name");
      return;
    }
    if (!gender) {
      alert("Please select your gender");
      return;
    }
    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }
  
    try {
      // Access userData from AsyncStorage and parse it
        const email = await AsyncStorage.getItem("email") || "";
        const password = await AsyncStorage.getItem("password") || "";

        const response = signInWithEmailAndPassword(auth, email, password)
        console.log("REGISTER : ", response)
        response.then((userCredential : any) => {
            const user = userCredential.user;
            user.displayName = firstName;

            user.gender = gender;
            user.address = address;
            AsyncStorage.setItem("userData", JSON.stringify(user))
        })
  
      // Confirmation message
      alert("Registration successful!");
      router.navigate("/intro/UserRegis")
      // You can navigate to the next screen or perform any other action here
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering. Please try again.");
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{ headerShown: true, headerTitle: "Register Yourself" }}
      />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Gender</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                gender === "Male" && styles.selectedRadioButton,
              ]}
              onPress={() => handleGenderChange("Male")}
            >
              <Text style={styles.radioText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                gender === "Female" && styles.selectedRadioButton,
              ]}
              onPress={() => handleGenderChange("Female")}
            >
              <Text style={styles.radioText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                gender === "Others" && styles.selectedRadioButton,
              ]}
              onPress={() => handleGenderChange("Others")}
            >
              <Text style={styles.radioText}>Others</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Your Address</Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={4}
            />
          </View>

          <View>
            <Button title="Register" onPress={register}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  selectedRadioButton: {
    backgroundColor: "lightblue",
  },
  radioText: {
    fontSize: 16,
  },
  addressInput: {
    marginTop: 5,
    height: 100,
    textAlignVertical: "top", // Align text to the top in multiline input
  },
});

export default TakeDetails;
