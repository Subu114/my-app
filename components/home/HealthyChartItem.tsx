import { StyleSheet, Image, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import {useEffect, useState} from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { usePathname, router, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HealthyChartItem = ({item} : any) => {
  const router = useRouter()
  const [mealChartSelected, setMealChartSelected] = useState("");
  const [loading, setLoading] = useState(false)
  const saveMealSelected = async () => {
    try {
      console.log("Setting The value to : " + item.id)
      await AsyncStorage.setItem("MEAL_CHART_SELECTED", item.id.toString());
    } catch (e) {
      console.log(e)
    }
    
  };

  const handleNavigate = () => {
    router.push(`/display/${item.id}`); // Navigate to the details screen with the selected item id
  };


  return (
    <View>
      {loading ? <ActivityIndicator size="large"/> : 
    <TouchableOpacity
        onPress={() => {
          setMealChartSelected(item.id.toString())
          saveMealSelected()
          handleNavigate()
        }} 
    >
      <View style={styles.mealChart}>
        <Image source={{ uri: item.imgUrl }} style={styles.mealChartImg} />
      </View>
    </TouchableOpacity>}
    </View>
  )
}

export default HealthyChartItem

const styles = StyleSheet.create({
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
});