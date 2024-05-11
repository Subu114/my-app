import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Low_Carb, Balanced_Diet } from "../../constants/data/data";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const MealDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const ID = parseInt(params.id);
  const [selectedChart, setSelectedChart] = useState();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const  pressedMeal = await AsyncStorage.getItem("MEAL");
        console.log("pressedMeal from d: ", pressedMeal);
        setMeal(JSON.parse(pressedMeal));
        setLoading(false)
      } catch (error) {
        console.error("Error retrieving selected meal:", error);
      }
    };

    getData();
  }, []);




  const mealTypeImage = () => {
    if (meal.meal_category === "veg") {
      return require("../../assets/images/veg.jpg");
    } else if (meal.meal_category === "non-veg") {
      return require("../../assets/images/non_veg.jpg");
    }
  };

  const addToCart = async () => {
    try {
      // Retrieve existing cart items from AsyncStorage
      const existingCartItems = await AsyncStorage.getItem("cart");
      let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

      // Check if the meal is already in the cart
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === meal.meal_id
      );

      if (existingItemIndex !== -1) {
        // If meal is already in the cart, increment its quantity
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // If meal is not in the cart, add it as a new item
        const newCartItem = {
          id: meal.meal_id,
          name: meal.meal_name,
          price: meal.meal_price,
          quantity: 1, // You can adjust this based on your requirements
          meal_description: meal.meal_description,
          meal_image: meal.meal_image,
          meal_category: meal.meal_category,
          meal_rating: meal.meal_rating,
          meal_count: meal.meal_count,
          meal_ingredients: meal.meal_ingredients,
          meal_tags: meal.meal_tags,
        };
        cartItems.push(newCartItem);
      }

      // Store the updated cart items back to AsyncStorage
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("Meal added to cart:", meal.meal_name);
    } catch (error) {
      console.error("Error adding meal to cart:", error);
    }
  };

  if (loading || !meal) {
    console.log(loading)
    console.log(meal)
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          headerTitle: "Meal Details",
          headerShown : true
        }}
      />
      <ScrollView style={styles.container}>
        <Image source={{ uri: meal.meal_image }} style={styles.mealImage} />
        <View style={styles.mealInfoCont}>
          <View style={styles.mealInfo}>
            <Text style={styles.mealName}>{meal.meal_name}</Text>
            <Image source={mealTypeImage()} style={styles.mealCat} />
          </View>
          <Text style={styles.mealDiscription}>{meal.meal_description}</Text>
          <View>
            <Text style={[styles.mealName, styles.textHeader]}>
              Ingredients:
            </Text>
            {meal.meal_ingredients.map((ingredient, index) => (
              <Text
                key={index}
                style={styles.mealDiscription}
              >{`\u2022 ${ingredient}`}</Text>
            ))}
          </View>
          <View>
            <Text style={[styles.mealName, styles.textHeader]}>Content:</Text>
            <Text style={styles.mealDiscription}>
              {"\u2022"} Calorie : {meal.ca}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buy_now}>
            <Image
              source={require("../../assets/images/buy_now.png")}
              style={styles.buy_now}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.add_to_cart} onPress={() =>{addToCart()}}>
            <Image
              source={require("../../assets/images/add_to_cart.png")}
              style={styles.add_to_cart}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MealDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  mealImage: {
    width: wp(92),
    height: hp(37.5),
    borderRadius: wp(5),
    alignSelf: "center",
    marginTop: hp(2),
  },
  mealInfoCont: {
    paddingHorizontal: wp(5.83),
    paddingVertical: hp(2.3),
  },
  mealInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "centre",
  },
  mealName: {
    fontFamily: "MonsterRatSemiBold",
    fontSize: hp(2.25),
  },
  mealCat: {
    width: wp(6.94),
    height: hp(3.125),
    resizeMode: "contain",
  },
  mealDiscription: {
    fontFamily: "MonsterRatRegular",
    fontSize: hp(1.75),
  },
  textHeader: {
    marginTop: hp(2),
  },
  buttonContainer: {
    marginTop: hp(1),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buy_now: {
    marginRight: hp(1),
    width: wp(32.77),
    height: hp(6.0),
    resizeMode: "contain",
  },
  add_to_cart: {
    width: wp(39.77),
    height: hp(6),
    resizeMode: "contain",
  },
});
