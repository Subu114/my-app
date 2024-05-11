import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

const sizes = {
    height : hp(4.5),
    width : wp (10)
}

const styles = StyleSheet.create({
    tabBar : {
        height : hp(8.7),
        alignContent : 'center',
        alignItems : 'center',
        alignSelf : 'baseline', 
        position : "absolute",
        bottom : 0,
        left : 0,
        right : 0,
    }
});

export {styles, sizes};