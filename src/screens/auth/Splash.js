import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    StatusBar,
    Image,
    View
} from 'react-native';
import { Header } from "../../components/Header";
import { ErrorText } from "../../components/Error";
import { useAuth } from '../../redux/providers/auth';
import SplashScreen from 'react-native-splash-screen';
import Global from '../../utils/global';

export default function Splash(props) {
    // console.log("props", props)
    const { navigation } = props;
    const { getAuthState } = useAuth()

    useEffect(() => {
        setTimeout(() => {
            load()
        }, 1000);
    }, [])

    async function load() {

        getAuthState()
            .then(({ isLoggedIn }) => {
                console.log("response: ", isLoggedIn)
                if (isLoggedIn) {
                    navigation.navigate('VideoCall')
                } else {
                    navigation.navigate('VideoCall')
                }
            }).catch((reason) => {
                console.log("error: ", reason)
                navigation.navigate('VideoCall')
            })

        // SplashScreen.hide()
    }

    return (
        <View style={styles.splash}>
            <Image style={{ height: 200, width: 200, alignSelf: "center" }} source={require("../../../assets/images/app_logo.png")} />
        </View>
    );
};

const styles = StyleSheet.create({
    splash: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: 100,
        width: 100,
        resizeMode: "cover"
    }
});