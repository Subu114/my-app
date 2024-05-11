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
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import UserLogo from "../../assets/images/vectors/user.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect, Stack, router, useRouter } from "expo-router";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

StatusBar.setHidden(true);
StatusBar.setBackgroundColor("white");

const UserRegis = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any[]>();

  const router = useRouter();


  const setUserDetailsLocally = async (
    user : any
  ) => {
    await AsyncStorage.setItem("firstName", user.name);
    await AsyncStorage.setItem("gender", user.gender);
    await AsyncStorage.setItem("address", user.address);
    await AsyncStorage.setItem("email", user.email);
    await AsyncStorage.setItem("signedIn", "1");
    console.log("USER : ", user)
  };

  const signIn = async () => {
    if (!email) alert("Please enter email address!");
    else if (!password) alert("Please enter password!");
    else {
      setIsLoading(true);
      try {
        const response = signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log(response);
        
    
        // Save the authentication token to AsyncStorage

        const userRef = collection(FIREBASE_FIRESTORE, "users");
        response
          .then(async (userCredential) => {
            // Handle the successful sign-in, for example, navigate to the appropriate screen
            setIsLoading(true)
            ToastAndroid.show("Logged In!", ToastAndroid.SHORT);


            const querySnapshot = await getDocs(
              query(userRef, where("email", "==", email))
            );

            if (querySnapshot.empty) {
              alert("User not found. Please check your email address.");
              return;
            }

            const users : any[] = [];
            querySnapshot.forEach((doc) => {
              users.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            
            setUserDetailsLocally(users[0])

            setIsLoading(false)
            console.log("LOGGED IN WITH USR : ");
            router.navigate("../(tabs)/");
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.code === "auth/invalid-email") {
              alert("Invalid email address. Please enter a valid email.");
            } else if (error.code === "auth/user-not-found") {
              alert("User not found. Please check your email address.");
            } else if (error.code === "auth/wrong-password") {
              alert("Invalid password. Please try again.");
            } else {
              // For other error codes, provide a generic error message
              alert("Sign-in failed. Please try again later.");
            }
          });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const focusToPassword = () => {
    
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <View style={styles.box}>
                <UserLogo width={wp(57.5)} height={hp(32.15)} />
              </View>

              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                textContentType="emailAddress"
                onChangeText={setEmail}
                autoCapitalize="none"
              ></TextInput>

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
                onSubmitEditing={() => focusToPassword()}
              ></TextInput>

              {loading ? (
                <ActivityIndicator size="large" color="lightblue" />
              ) : (
                <>
                  <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setEmail("");
                      setPassword("");
                      router.navigate("/intro/Register");
                    }}
                    style={styles.register}
                  >
                    <Text>Register Here</Text>
                  </TouchableOpacity>
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
    //borderRadius: 40,
    backgroundColor: "white",
    paddingVertical: hp(7.375),
    paddingHorizontal: wp(18.61),
  },
  innerContainer: {
    alignItems: "center",
  },
  box: {
    width: wp(61.66),
    height: hp(35.5),
    borderRadius: 38,
    borderWidth: wp(0.8),
    borderColor: "#d6d6d6",
    justifyContent: "center",
  },
  label: {
    fontSize: hp(1.88),
    color: "black",
    marginTop: hp(2.5),
    alignSelf: "flex-start",
  },
  input: {
    width: wp(63),
    height: hp(5.37),
    borderRadius: 10,
    borderWidth: wp(0.55),
    borderColor: "#5d5c5c",
    marginTop: hp(2.4),
    padding : hp(1)
  },
  button: {
    width: wp(10000/360),
    height: hp(3600/800),
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
    paddingTop: hp(100/8),
  },
});

export default UserRegis;
