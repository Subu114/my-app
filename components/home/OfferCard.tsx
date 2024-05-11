import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const OfferCard = () => {
  return (
    <View style={styles.offerCardCont}>
          <ImageBackground
            source={require('../../assets/images/home_offer_rectangle.png')}
            style={styles.offerCard}>
            <Image
              source={{
                uri: 'https://drive.google.com/uc?export=view&id=1SQB37-jAWOXrdt0zA9ORtBqsAD1opyNA',
              }}
              style={styles.offerCardImg}
            />
            <View style={styles.footCatCont}>
              <View style={styles.FootCatImg}>
                <Image
                  source={require('../../assets/images/foodCat/veg.png')}
                  style={styles.FootCatImg}
                />
                <Text style={styles.FootCatText}>veg</Text>
              </View>
              <View style={styles.FootCatImg}>
                <Image
                  source={require('../../assets/images/foodCat/non_veg.png')}
                  style={styles.FootCatImg}
                />
                <Text style={styles.FootCatText}>non - Veg</Text>
              </View>
              <View style={styles.FootCatImg}>
                <Image
                  source={require('../../assets/images/foodCat/vegan.png')}
                  style={styles.FootCatImg}
                />
                <Text style={styles.FootCatText}>Vegan</Text>
              </View>
              <View style={styles.FootCatImg}>
                <Image
                  source={require('../../assets/images/foodCat/premium.png')}
                  style={styles.FootCatImg}
                />
                <Text style={styles.FootCatText}>premium</Text>
              </View>
              <View style={styles.FootCatImg}>
                <Image
                  source={require('../../assets/images/foodCat/top_rated.png')}
                  style={styles.FootCatImg}
                />
                <Text style={styles.FootCatText}>top-rated</Text>
              </View>
              <View style={styles.FootCatImg}>
                <Image
                  source={require('../../assets/images/foodCat/express_delivery.png')}
                  style={styles.FootCatImg}
                />
                <Text style={styles.FootCatText}>express delivery</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
  )
}

export default OfferCard

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
      fontFamily : 'SegoeUIBold'
    },
    addressTxtCont: {
      position: 'absolute',
      right: 0,
      marginHorizontal: wp(8.33),
      marginVertical: hp(0.75),
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
      marginTop: 10,
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