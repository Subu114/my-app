import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs, useRouter } from 'expo-router';

import {styles, sizes} from '../tabs.style'
import {Home, Cart, Calendar, Search, Account} from '../../assets/images'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
    const router = useRouter()
  return (
    <Tabs initialRouteName='index' screenOptions={{ headerShown : false, tabBarActiveTintColor: 'blue', tabBarStyle : styles.tabBar, }}>
      <Tabs.Screen
        name="Search" 
        options={{
          title: '',
          tabBarIcon: () => <Search height={sizes.height} width={sizes.width}/>,

        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: '',
          tabBarIcon: () => <Cart height={sizes.height} width={sizes.width}/>,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: () => <Home />,
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: '',
          tabBarIcon: () => <Calendar height={sizes.height} width={sizes.width}/>,
        }}
      />
      
      <Tabs.Screen
        name="Account"
        options={{
          title: '',
          tabBarIcon: () => <Account height={sizes.height} width={sizes.width}/>,
        }}
      />

      
    </Tabs>
  );
}
