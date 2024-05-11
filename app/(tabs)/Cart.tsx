import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { styles, MealsDisplay } from "../cart.style";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();
  useFocusEffect(
    React.useCallback(() => {
      const fetchCartItems = async () => {
        try {
          const existingCartItems = await AsyncStorage.getItem("cart");
          if (existingCartItems) {
            const parsedCartItems = JSON.parse(existingCartItems);
            setCartItems(parsedCartItems);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItems();
    }, [])
  );

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem("cart");
      setCartItems([]); // Clear the cart items in state
      console.log("Cart emptied successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const renderCartItem = (item: any, index: number) => {
    return (
      <View key={index} style={styles.cartItemContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.cartItemName}
        >
          {item.name}
        </Text>
        <View style={styles.cartItemDetails}>
          <Text
            style={styles.cartItemQuantity}
          >{`(x${item.quantity}) : `}</Text>
          <Text style={styles.cartItemPrice}>{item.price}</Text>
        </View>
      </View>
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <Text style={styles.noItem} numberOfLines={2}>
        No items in cart
      </Text>
    ); // Render a message if cart is empty
  }

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerTitle: "Cart" }} />
      <ScrollView>
        <View style={styles.container1}>
          <Text
            style={styles.totalItems}
          >{`Total Items: ${cartItems.length}`}</Text>
          {cartItems.map((item, index) => renderCartItem(item, index))}
        </View>
        <View>
          <View style={styles.separator} />
          <Text
            style={[styles.totalPrice]}
          >{`Total Price: ${calculateTotalPrice()}`}</Text>
          <View style={styles.separator} />
        </View>

        <View>
          <TouchableOpacity onPress={clearCart} style={styles.clrChartBtn}>
            <Text style={styles.clrChartTxt}>CLEAR CART</Text>
          </TouchableOpacity>
        </View>

        <View>
          {cartItems.map((item) => (
            <MealsDisplay key={item.id.toString()} meal={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
