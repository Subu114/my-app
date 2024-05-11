import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH,  } from "@/FirebaseConfig";

const Index = () => {
  //const [user, setUser] = useState<User | null>(null);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSignedIn = async () => {
      try {
        
        const signedIn = await AsyncStorage.getItem('signedIn');
        console.log("SIGNED IN FOUND!!")
        if (signedIn === '1') {
          setUser(true);
        }
      } catch (error) {
        console.error('Error checking signed in status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSignedIn();

  }, []);

  console.log('Logging : ', user);

  if (loading) {
    
    return <ActivityIndicator size="large" />;
  } else if (user) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/intro/Introduction" />;
  }
};
export default Index;
const styles = StyleSheet.create({});
