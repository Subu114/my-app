import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


import Arrow from "../../assets/images/vectors/arrow.svg";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Introduction = () => {
  const setUser = async () => {
    try {

        await AsyncStorage.setItem('open', "1") ;
        console.log("RETRIENDE")
        
    } catch (error) {
        console.error('Error Settig user data:', error);
    }
};
  return (
    <SafeAreaView style = {{flex : 1, backgroundColor : "#000"}}>
      <Stack.Screen />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/ellipse.png")}
            style={[styles.image, styles.ellipse]}
          />
          <Image
            source={require("../../assets/images/ellipse.png")}
            style={[styles.image]}
          />
          <Image
            source={require("../../assets/images/info_img.png")}
            style={[styles.image, styles.infoImg]}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            “Want to make every meal a step towards a healthier you?”
          </Text>
        </View>
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {setUser();router.push('/intro/UserRegis')}}>
            <Text style={styles.btnText}>JOIN NOW</Text>
            <View style={styles.btnIcon}>
              <Arrow width={wp(4)} height={hp(2)} />
            </View>
          </TouchableOpacity>
        </View>
      
    </SafeAreaView>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: hp(68),
    position: "absolute",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  ellipse: {
    zIndex: 1,
    marginTop: hp(12),
    resizeMode: "contain",
  },
  infoImg: {
    height: hp(62),
    zIndex: 2,
  },
  infoContainer: {
    width: wp(78.33),
    paddingTop: hp(7),
    top: hp(58),
    alignSelf: "center",
  },
  infoText: {
    fontFamily: "monospace",
    fontSize: hp(2),
    textAlign: "center",
    zIndex: 3,
    position: "relative",
    color: "#000",
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: hp(10),
    alignSelf: "center",
  },
  button: {
    borderWidth: wp(0.55),
    borderRadius: 25,
    borderColor: "#7BE0F7",
    width: wp(30.61),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btnText: {
    color: "#7BE0F7",
    fontSize: hp(1.9),
    paddingVertical: hp(0.8),
  },
  btnIcon: {
    //paddingVertical : hp(0.7)
  },
});
