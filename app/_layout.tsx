import { useCallback, useEffect } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';

import { Stack } from 'expo-router';


SplashScreen.preventAutoHideAsync()
const Layout = () => {
    const [fontsLoaded] = useFonts({
        PalanquinDarkRegular: require('../assets/fonts/PalanquinDark-Regular.ttf'),
        PalanquinDarkMedium: require('../assets/fonts/PalanquinDark-Medium.ttf'),
        PalanquinDarkSemiBold: require('../assets/fonts/PalanquinDark-SemiBold.ttf'),
        PalanquinDarkBold: require('../assets/fonts/PalanquinDark-Bold.ttf'),
        SegoeUI: require('../assets/fonts/Segoe UI.ttf'),
        SegoeUIBold: require('../assets/fonts/Segoe UI Bold.ttf'),
        MonsterRatRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
        MonsterRatLight: require('../assets/fonts/Montserrat-Light.ttf'),
        MonsterRatSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    });

    useEffect(() => {
        const onLayoutRootView = async () => {
            console.log("Hyyyyyyy");
            await NavigationBar.setBehaviorAsync('overlay-swipe');
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        };

        const timeout = setTimeout(() => {
            onLayoutRootView();
        }, 2000); // 3 seconds timeout

        return () => clearTimeout(timeout); 
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (    
        <Stack screenOptions={{headerShown : false}}/>

    );
};

export default Layout;
