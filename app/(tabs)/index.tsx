import { Stack, useRouter } from "expo-router";
import {View, SafeAreaView, Text, ScrollView, StatusBar, Pressable} from 'react-native'

import {HomeHeader, OfferCard, HealthyChart} from '../../components/'
StatusBar.setHidden(true)
const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView style = {{flex : 1, backgroundColor : "#fff"}}>
            <Stack.Screen 
                options={{
                    headerShown : false
                }}
            />
            <ScrollView>
                <HomeHeader/>
                <OfferCard />
                <HealthyChart />
                
            </ScrollView>

        </SafeAreaView>
    )
}

export default Home;