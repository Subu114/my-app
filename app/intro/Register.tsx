import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


import { Link, Redirect, Stack, router, useRouter } from "expo-router";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

StatusBar.setHidden(true);
StatusBar.setBackgroundColor("white");

const UserRegis = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();
  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const auth = FIREBASE_AUTH;
  const signUp = () => {
    if (!email.trim()) alert("Please enter email address!");
    else if (!password.trim()) alert("Please enter password!");
    else if (!firstName.trim()) alert("Please enter First Name!");
    else if (!gender.trim()) alert("Please enter Gender!");
    else if (!address.trim()) alert("Please enter Address!");
    else {
      try {
        setIsLoading(true);
        const response = createUserWithEmailAndPassword(auth, email, password);

        response
          .then((userCredential) => {
            console.log(email);
            console.log(password);
            console.log(firstName);
            console.log(gender);
            console.log(address);
            ToastAndroid.show("Registered!", ToastAndroid.SHORT);

            const addUser = async () => {
              const doc = await addDoc(
                collection(FIREBASE_FIRESTORE, "users"),
                {
                  name: firstName,
                  email: email,
                  gender: gender,
                  address: address,
                }
              );
              console.log();
            };
            addUser();

            setIsLoading(false);
            router.navigate("./UserRegis");
          })
          .catch((error): any => {
            setIsLoading(false);
            if (error.code === "auth/invalid-email") {
              alert("Invalid email address. Please enter a valid email.");
            } else if (error.code === "auth/user-not-found") {
              alert("User not found. Please check your email address.");
            } else if (error.code === "auth/wrong-password") {
              alert("Invalid password. Please try again.");
            } else {
              // For other error codes, provide a generic error message
              alert("Sign-Up failed. Please try again later.");
            }
          });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: true, headerTitle: "Register" }} />
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                textContentType="emailAddress"
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholder="e.g. example@gmail.com"
              ></TextInput>

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
                placeholder="myPassword"
              ></TextInput>

              <Text style={styles.label}>Enter First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />

              <Text style={[styles.label]}>Select Gender</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
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

              <Text style={styles.label}>Enter Your Address</Text>
              <TextInput
                style={[styles.input, styles.addressInput]}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={4}
              />
              {loading ? (
                <ActivityIndicator size="large" color="lightblue" />
              ) : (
                <>
                  <TouchableOpacity style={styles.button} onPress={signUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>

                  <Link href="/intro/UserRegis" style={styles.register}>
                    Already Have an Account ? Sign In here
                  </Link>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Set the background color of SafeAreaView if needed
  },
  container: {
    width: wp(100),
    height: hp(100),
    backgroundColor: "white",
    paddingVertical: hp(1.375),
    paddingHorizontal: wp(18.61),
  },
  innerContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: hp(1.88),
    color: "black",
    marginTop: hp(2),
    alignSelf: "flex-start",
  },
  input: {
    width: wp(63),
    height: hp(5.37),
    borderRadius: 10,
    borderWidth: wp(0.55),
    borderColor: "#5d5c5c",
    marginTop: hp(2.4),
    padding: 5,
  },
  button: {
    width: 105,
    height: 36,
    borderRadius: 10,
    backgroundColor: "black",
    marginTop: 20.17,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fbfefe",
    fontSize: hp(2.25),
    fontFamily: "monospace",
    fontWeight: "700",
  },
  register: {
    paddingTop: 100,
  },

  radioButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: wp(1),
    marginTop: hp(2),
  },
  selectedRadioButton: {
    backgroundColor: "lightblue",
  },
  radioText: {
    fontSize: 16,
  },
  addressInput: {
    marginTop: hp(2),
    height: hp(12),
    textAlignVertical: "top", // Align text to the top in multiline input
  },
});

export default UserRegis;
