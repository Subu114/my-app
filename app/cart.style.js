import { StyleSheet, TouchableOpacity, View, Text, Image} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


import Rating from '../assets/images/vectors/rating.svg'
import { useRouter } from "expo-router";

const MealsDisplay = ({meal}) =>{
    const mealTypeImage = () => {
        if (meal.meal_category === 'veg') {
            return require("../assets/images/veg.jpg");
        } else if (meal.meal_category === 'non-veg') {
            return require("../assets/images/non_veg.jpg");
        }
    };
    const router = useRouter()
    return (
        <TouchableOpacity style={STYLES.meal} onPress={() =>{}}>
            <View style={STYLES.left_cont}>
                <Text style={STYLES.mealName} numberOfLines={2}>{meal.name}</Text>
                <View style={STYLES.rating_cont}>
                    <View>
                        <Rating width={wp(3.7)} height={hp(1.625)}/>
                    </View>
                    <Text style={STYLES.rating_text}>{meal.meal_rating}</Text>
                </View>
            </View>
            <View style={STYLES.right_cont}>
                <View style={STYLES.right_img_cont}>
                    <Image
                        style={STYLES.mealCat}
                        source={mealTypeImage()}
                    />
                    <Image
                        style={STYLES.mealImg}
                        source={{ uri: meal.meal_image }}
                    />
                </View>
                <Text style={STYLES.price}>Rs. {meal.price}</Text>
            </View>
        </TouchableOpacity>
    )
}


const STYLES = StyleSheet.create({
    meal: {
        flexDirection: 'row',
        backgroundColor: "#E8E8E8",
        borderRadius: hp(1.3),
        marginVertical: hp(0.625),
        marginHorizontal: wp(1.38),
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'center',
        width : wp(92.77),
        //height : hp(15.375)
    },
    left_cont: {
        flex: 1,
        paddingRight:wp(2.77),
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
    right_cont: {
        flexDirection: "column",
        alignItems: 'center',
    },
    right_img_cont: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: wp(27.77),
        borderRadius: hp(2.125),
    },
    price: {
        marginTop: wp(1.38),
    },
});

const styles = StyleSheet.create({
    container1 : {
        marginHorizontal : wp(4.44),
        marginVertical : hp(1.4375)
    },
    cartItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4.44),
        marginBottom: hp(1),
    },
    totalItems : {
        fontFamily : "MonsterRatSemiBold",
        fontSize : hp(2.375),
        marginBottom : hp(3.5)
    },
    cartItemName: {
        fontFamily: 'MonsterRatRegular',
        fontSize: hp(2.125),
        flex: 1,
        marginRight: wp(2.22),
    },
    cartItemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartItemQuantity: {
        fontFamily: 'MonsterRatRegular',
        fontSize: hp(2.125),
        marginRight: wp(2.22),
    },
    cartItemPrice: {
        fontFamily: 'MonsterRatRegular',
        fontSize: hp(2.125),
    },
    totalPrice : {
        fontFamily: 'MonsterRatSemiBold',
        fontSize: hp(1.875),
        alignSelf : 'flex-end',
        marginRight : wp(2.22)
    },
    separator: {
        width : "100%",
        borderBottomWidth: hp(0.125),
        borderBottomColor: 'black',
        margin : 0,
        padding : 0
    },
    clrChartBtn : {
        backgroundColor : "skyblue",
        alignItems : 'center',
        marginVertical: hp(0.625),
        marginHorizontal: wp(1.38),
        borderRadius : hp(1.25),
        paddingVertical: hp(1.25),
        paddingHorizontal: wp(2.77),
        elevation : 4
    },
    clrChartTxt : {
        fontWeight : "bold",
        fontSize : hp(1.8),
        color : "#000"

    },
    noItem : {
        flex : 1,
        textAlign : "center",
        textAlignVertical : 'center',
        fontSize : hp(5),
        color : "#111"
    }
});
export  {styles, MealsDisplay};  