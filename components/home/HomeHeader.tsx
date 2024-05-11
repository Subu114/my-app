import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, FlatList, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'

//Instaleld packages
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import {UserGreet} from '../../assets/images/vectors'

import AsyncStorage from '@react-native-async-storage/async-storage'


import { useFocusEffect } from 'expo-router'

const HomeHeader = () => {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLaoding] = useState(true)
  useFocusEffect(
    React.useCallback(() => {
      
        const fetchUserName = async () => {
            try {
              
                const s = await AsyncStorage.getItem('firstName');
                const a = await AsyncStorage.getItem('address');
                if (s  && a) {
                    const processed = s[0].toUpperCase() + s.slice(1).toLowerCase()
                    setName(processed);
                    setAddress(a);
                    setLaoding(false)
                }
            } catch (error) {
                console.error('Error fetching user Name:', error);
            }
        };
        
        fetchUserName();
    }, [])
);
const getTime = () => {
  const currentHour = new Date().getHours();
  let newGreeting = "How's you";

  if (currentHour >= 5 && currentHour < 12) {
    newGreeting = "Good Morning 🌄";
  } else if (currentHour >= 12 && currentHour < 18) {
    newGreeting = "Good Afternoon 🌤️";
  } else {
    newGreeting = "Good Evening 🌆";
  }
  return newGreeting
}
  return (
    <View>
      {loading ? <ActivityIndicator size="large" /> : 
        <View style={styles.header}>
          <View style={styles.userGreetImgCont}>
            <UserGreet width={wp(8.7)} height={hp(3.875)} />
          </View>
          <View style={styles.greetCont}>
            <Text style={styles.greetTextUser}> Hello {name} </Text>
            <Text style={styles.greetText}>{getTime()}</Text>
          </View>
          <View style={styles.addressTxtCont}>
            <Image source={require('../../assets/images/location.png')} />
            <Text style={styles.addressTxt} numberOfLines={3}>
              {address} 
            </Text>
          </View>
        </View>}
    </View>
  )
}

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    height: hp(6.25),
    width: wp(98),
    flexDirection: 'row',
    marginHorizontal: wp(2.77),
    marginVertical: hp(1.25),
    alignSelf: 'center',
  },
  userGreetImgCont: {
    justifyContent: 'center',
  },
  greetCont: {
    justifyContent: 'center',
  },
  greetText: {
    fontSize: hp(1.7),
    color: '#5E5D5D',
  },
  greetTextUser: {
    fontSize: hp(2.25),
    color: '#5E5D5D',
    fontWeight: 'bold',
  },
  addressTxt: {
    fontSize: hp(1.25),
    color: '#5E5D5D',
    fontFamily : 'SegoeUIBold',
    maxWidth : hp(20),
    marginLeft : wp(1)
  },
  addressTxtCont: {
    position: 'absolute',
    right: 0,
    marginHorizontal: wp(2.77),
    flexDirection : 'row',
    marginVertical: hp(1.25),
  },
  offerCardCont: {
    width: wp(97.5),
    height: hp(35),
    marginHorizontal: wp(1.66),
    marginVertical: hp(0.75),
    alignSelf: 'center',
  },
  offerCard: {
    borderRadius: hp(3.75),
    overflow: 'hidden',
  },
  offerCardImg: {
    width: wp(94.44),
    height: hp(22),
    alignItems: 'center',
    resizeMode: 'contain',
    marginTop: hp(1.25),
    alignSelf: 'center',
  },
  footCatCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.6),
    marginBottom: hp(2.5),
    width: wp(90.277),
    alignSelf: 'center',
  },
  FootCatImg: {
    position: "relative",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: wp(14),
    height: hp(8),
  },
  FootCatText: {
    position: "absolute",
    top: hp(7.5),
    left: 0,
    right: 0,
    color: '#FFFFFF',
    textAlign: 'center', // Center text within its container
    fontSize: hp(1.1),

  },

  mealChartContainer: {
    marginTop: hp(0.1),
    marginLeft: wp(1.66),
    elevation: 7,
  },
  mealChart: {
    marginHorizontal: wp(0.5),
    marginLeft: 0,
    alignSelf: 'center',
  },
  mealChartImg: {
    width: wp(36.11),
    height: hp(21.25),
    zIndex: 1,
    borderRadius: hp(2.625),
    alignSelf: 'center',
  },
  mealChartTitle: {
    paddingVertical: hp(0.625),
    paddingHorizontal: wp(1.388),
    marginLeft: wp(1),
    color: '#000000',
    fontWeight: 'bold',
    fontSize: hp(2.5),
  },
  navIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});