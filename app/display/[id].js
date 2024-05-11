import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";


import { FlatList, SafeAreaView, ActivityIndicator, View } from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "@/FirebaseConfig";

import MealsDisplay from "@/components/home/MealsDisplay";

const Meal = () => {
  
  const params = useLocalSearchParams();
  const router = useRouter();
  const [selectedChart, setSelectedChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState("Meals")

  useEffect(() => {
    const fetchMeals = async (mealChart, name) => {
      
      const mealChartCollectionRef = collection(FIREBASE_FIRESTORE, mealChart);
      
      try {
        
        const querySnapshot = await getDocs(mealChartCollectionRef);
        
        const mealChartsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setSelectedChart(mealChartsData);
        setHeaderTitle(name)
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching meal charts:', error);
      }
    };

    switch (parseInt(params.id)) {
      case 1:
        fetchMeals("low_carbs", "Low Carb Meals");
        break;

      case 2:
        fetchMeals("balanced_diets", "Balance Diet Meals");
        break;

      case 3:
        fetchMeals("dairy_free", "Dairy Free Meals");
        break;

      case 4:
        fetchMeals("high_protein", "High Protein Meals");
        break;

      case 5:
        fetchMeals("gluten_free", "Gluten Free Meals");
        break;

      case 6:
        fetchMeals("ketogenic", "Ketogenic Meals");
        break;

      default:
        fetchMeals("", "No Meal Found ");
    }
  }, [params.id]);
  
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "fff" }}>
      <Stack.Screen
        
        options={{
          headerShown : true,
          headerTitle : headerTitle
        }}
      />
      <View>
        <FlatList
          data={selectedChart}
          renderItem={({ item }) => <MealsDisplay meal={item} />}
          keyExtractor={(item) => item.meal_id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Meal;
