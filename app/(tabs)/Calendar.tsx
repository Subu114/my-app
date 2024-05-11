import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'

const Calendar = () => {
  return (
    <View>
      <Text style = {styles.comingSoon} numberOfLines={2}>Comming Soon...</Text>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
    comingSoon : {
        textAlign : 'center',
        marginTop : heightPercentageToDP(40),
        fontSize : heightPercentageToDP(3)
    }
})