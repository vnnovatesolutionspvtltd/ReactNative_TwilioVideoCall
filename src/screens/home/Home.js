import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, TextInput, Text, Linking, View, Image, Button, TouchableOpacity, StyleSheet, Dimensions, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator,Keyboard } from 'react-native';
import { useAuth } from '../../redux/providers/auth';
import { CustomText } from '../../components/Text';
import { config, fonts, colors } from '../../utils/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { CustomTextInput } from '../../components/TextInput';
import { useRef } from 'react';

export default function Home(props) {
    const { navigation, route } = props;
    // const { navigate } = navigation;

    const { state } = useAuth();
    const user = state.user;

    return (
        <View style={styles.MainContainer}>
            <View style={styles.CenterView}>
                <CustomText style={styles.textContainer}>Under Development</CustomText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.bg_color,
    },
    CenterView: {
        flex: 1,
        justifyContent: "center"
    },
    LineStyle: {
        height: verticalScale(1),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
        backgroundColor: colors.accent_color,
    },
    textContainer: {
        fontSize: moderateScale(20),
        alignSelf: "center"
    },
    ImageContainer: {
        height: verticalScale(150),
        width: Dimensions.get('window').width - scale(60),
        borderRadius: moderateScale(8),
        resizeMode: 'cover',
    },
    ViewBgContainer1: {
        marginLeft: moderateScale(10),
        marginRight: moderateScale(10),
        flexDirection: 'row',
        width: Dimensions.get('window').width - scale(20),
        justifyContent: "space-between",
        alignItems: "center",
        height: verticalScale(40),
        padding: moderateScale(5),
        borderRadius: moderateScale(20),
        borderWidth: moderateScale(1),
        borderColor: colors.accent_color
    },
    ViewBgContainer2: {
        height: verticalScale(30),
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: moderateScale(5),
        marginLeft: moderateScale(5),
        marginRight: moderateScale(5),
        backgroundColor: "white",
        flex: 1
    },
    TextContainer2: {
        height: verticalScale(40),
        fontSize: moderateScale(16),
        width: scale(260),
        backgroundColor: 'transparent',
        color: colors.accent_color,
        fontFamily: fonts.opensans_light,
    },
    ImageContainer1: {
        height: verticalScale(50),
        width: scale(50),
        margin: moderateScale(5),
        alignSelf: 'center',
        tintColor: colors.secondary_color,
    },
    TextContainer1: {
        fontSize: moderateScale(14),
        color: colors.main_color,
        textAlign: 'center',
        marginLeft: moderateScale(10),
        marginRight: moderateScale(10),
    },
    viewContainer: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width / 2 - scale(20),
        justifyContent: 'flex-end',
        // borderColor: colors.accent_color,
        // borderWidth: moderateScale(1),
        margin: moderateScale(10),
        borderRadius: moderateScale(8),
        height: Dimensions.get('window').width / 2.5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    viewContainer1: {
        backgroundColor: colors.secondary_color,
        width: Dimensions.get('window').width / 2 - scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderColor: colors.accent_color,
        height: verticalScale(50),
        borderBottomLeftRadius: moderateScale(8),
        borderBottomRightRadius: moderateScale(8),
    },
});