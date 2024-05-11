import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { Link, Redirect, router } from 'expo-router'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Account = () => {
  const [signedOut, setSignedOut] = React.useState(false);

  const signOut = async () => {
    try {
      // Remove user data from AsyncStorage
      await FIREBASE_AUTH.signOut(); 
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("firstName");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("address");
      await AsyncStorage.removeItem("gender");
      await AsyncStorage.removeItem("signOut");
      await AsyncStorage.removeItem("signedIn");
      
      // Confirmation message
      alert("User data removed successfully!");
      setSignedOut(true); // Set signedOut state to true after successful sign out
    } catch (error) {
      console.error("Error removing user data:", error);
      alert("Error removing user data. Please try again.");
    }
  }

  if (signedOut) {
    return <Redirect href="/" />
    ; // Redirect to the home page after signing out
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* Your other UI components */}
      <Button title='Sign Out' onPress={signOut} />
    </View>
  );
}


export default Account

const styles = StyleSheet.create({
  comingSoon : {
      textAlign : 'center',
      marginTop : heightPercentageToDP(40),
      fontSize : heightPercentageToDP(3)
  }
})