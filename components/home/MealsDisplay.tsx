import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useRouter } from 'expo-router';
import Rating from '../../assets/images/vectors/rating.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MealsDisplay = ({ meal }: any) => {
  
    const addToCart = async () => {
        try {
            // Retrieve existing cart items from AsyncStorage
            const existingCartItems = await AsyncStorage.getItem('cart');
            let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
    
            // Check if the meal is already in the cart
            const existingItemIndex = cartItems.findIndex((item : any) => item.id === meal.meal_id);
    
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
                    meal_image:  meal.meal_image,
                    meal_category:  meal.meal_category,
                    meal_rating:  meal.meal_rating,
                    meal_count:  meal.meal_count,
                    meal_ingredients:meal.meal_ingredients,
                    meal_tags: meal.meal_tags
                };
                cartItems.push(newCartItem);
            }
    
            // Store the updated cart items back to AsyncStorage
            await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
            console.log('Meal added to cart:', meal.meal_name);
        } catch (error) {
            console.error('Error adding meal to cart:', error);
        }
    };
    

    const mealTypeImage = () => {
        if (meal.meal_category === 'veg') {
            return require("../../assets/images/veg.jpg");
        } else if (meal.meal_category === 'non-veg') {
            return require("../../assets/images/non_veg.jpg");
        }
    };
    const router = useRouter();

    const pressedMeal = async() =>{
        try{
            await AsyncStorage.setItem('MEAL', JSON.stringify(meal));
            console.log('Meal Pressed : ', meal.meal_name);
        } catch (error) {
            console.error('Error adding meal to cart:', error);
        }
        router.push(`/details/${meal.meal_id}`)
    }

    return (
        <TouchableOpacity style={styles.meal} onPress={() => pressedMeal()}>
            <View style={styles.left_cont}>
                <Text style={styles.mealName} numberOfLines={2}>{meal.meal_name}</Text>
                <View style={styles.rating_cont}>
                    <View>
                        <Rating width={wp(3.7)} height={hp(1.625)}/>
                    </View>
                    <Text style={styles.rating_text}>{meal.meal_rating}</Text>
                </View>
                <View style={styles.button_cont}>
                    <TouchableOpacity >
                        <Image 
                        source={require('../../assets/images/buy_now.png')}
                        style = {styles.buy_now}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={addToCart}>
                        <Image 
                        source={require('../../assets/images/add_to_cart.png')}
                        style = {styles.add_to_cart}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.right_cont}>
                <View style={styles.right_img_cont}>
                    <Image
                        style={styles.mealCat}
                        source={mealTypeImage()}
                    />
                    <Image
                        style={styles.mealImg}
                        source={{ uri: meal.meal_image }}
                    />
                </View>
                <Text style={styles.price}>Rs. {meal.meal_price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MealsDisplay;

const styles = StyleSheet.create({
    meal: {
        flexDirection: 'row',
        backgroundColor: "#E8E8E8",
        borderRadius: hp(1.3),
        marginVertical: hp(0.625),
        marginHorizontal: wp(1.38),
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width : wp(92.77),
        //height : hp(15.375)
    },
    left_cont: {
        flex: 1,
        paddingRight: wp(2.77),
    },
    mealName: {
        paddingVertical: hp(0.625),
        paddingHorizontal: wp(1.38),
        maxWidth: '98%',
        overflow: 'hidden',
        fontSize : hp(2),
        fontFamily : 'MonsterRatRegular'
    },
    rating_cont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(0.625),
        paddingHorizontal: wp(1.38),
    },
    rating_text: {
        marginLeft: wp(1.38),
    },
    button_cont: {
        flexDirection: 'row',
        marginTop: hp(1.25),
        marginBottom : hp(0.625)
    },
    buy_now: {
        marginRight: hp(1),
        width : wp(26),
        height : hp(3.8),
        resizeMode : 'contain'
    },
    add_to_cart: {
        width : wp(26),
        height : hp(3.8),
        resizeMode : 'contain'
    },
    right_cont: {
        flexDirection: "column",
        alignItems: 'center',
    },
    right_img_cont: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight : wp(1.388),
        marginTop : wp(1.388)
    },
    mealCat: {
        height: hp(2.5),
        width: wp(5.5),
        marginRight: wp(2.77),
        resizeMode : 'contain'
    },
    mealImg: {
        height: hp(12.5),
        width: wp(27),
        borderRadius: hp(2.125),
    },
    price: {
        marginTop: hp(0.6),
    },
});
