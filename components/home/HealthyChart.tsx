import { StyleSheet, Image, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'expo-router'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'


import HealthyChartItem from './HealthyChartItem'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_FIRESTORE } from '@/FirebaseConfig'

const HealthyChart = () => {
  const [mealCharts, setMealCharts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchMealCharts = async () => {
      // Reference to 'meal_chart' collection
      const mealChartCollectionRef = collection(FIREBASE_FIRESTORE, 'meal_chart');
      
      try {
        // Fetch all documents in 'meal_chart' collection
        const querySnapshot = await getDocs(mealChartCollectionRef);
        // Map documents to an array of meal chart data
        const mealChartsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Set meal charts state
        setMealCharts(mealChartsData);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching meal charts:', error);
      }
    };

    // Call the fetch function
    fetchMealCharts();
  }, []); // Empty dependency array to ensure the effect runs only once

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.mealChartContainer}>
      
        <Text style={styles.mealChartTitle}>Healthy Charts</Text>
        <FlatList
            data={mealCharts}
            renderItem={({ item }) => <HealthyChartItem item={item}/>}
            keyExtractor={item => item.id.toString()} 
            horizontal={true}
        />
    </View> 
  )
}

const styles = StyleSheet.create({
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
});


export default HealthyChart;