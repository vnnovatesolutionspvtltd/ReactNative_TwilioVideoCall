import React, { useState, useContext } from 'react';
import {
    Text, View, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity,
    Dimensions, ScrollView, KeyboardAvoidingView, Image
} from 'react-native';
import { useAuth } from '../../redux/providers/auth';
import { CommonActions } from '@react-navigation/native';
import { colors } from '../../utils/constants';
import { CustomText } from '../../components/Text';

export default function Setting(props) {
    const { navigation } = props;

    const [username, setUserName] = useState("Isha Gandhi");
    const [email, setEmail] = useState("isha@gmail.com");
    const [userRole, setUserRole] = useState("Doctor");
    const { state, handleLogout } = useAuth();
    const [subscriptionValue, setSubscriptionValue] = useState(false);
    const [notificationValue, setNotificationValue] = useState(false);

    const user = state.user;

    function onChangeValue(value) {
        if (value == 1) {
            if (subscriptionValue == false) {
                setSubscriptionValue(true)
            } else {
                setSubscriptionValue(false)
            }

        } else {
            if (notificationValue == false) {
                setNotificationValue(true)
            } else {
                setNotificationValue(false)
            }

        }

    }

    function logout() {
        Alert.alert(
            "Log Out",
            'Are you sure you want to log out?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        btn_LogoutClick()
                    },
                },
            ],
            { cancelable: false },
        )
    }

    async function btn_LogoutClick() {
        await handleLogout()
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Login' },
                ],
            })
        );


    }

    return (
        <View style={styles.MainContainer}>
            <View style={styles.CenterView}>
                {/* <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                    <View height={20} />
                    <View style={styles.viewContainer1}>
                        <View >
                            <CustomText style={styles.TextContainer}>{username}</CustomText>
                            <CustomText style={styles.TextContainer1}>{email}</CustomText>
                            <CustomText style={[styles.TextContainer1, { color: colors.main_color }]}>{userRole}</CustomText>
                        </View>
                        <TouchableOpacity onPress={() => logout()}>
                            <Image style={styles.ImageContainer} source={require('../../../assets/images/logout.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>

                        ------------------ My Order -----------------
                        <TouchableOpacity onPress={() => navigation.navigate("MyOrder")} >
                            <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                <CustomText style={styles.TextContainer2}>My Orders</CustomText>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.main_color }} source={require('../../../assets/images/Rightarrow.png')}></Image>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.LineStyle} />

                        ------------------ Subscription Status -----------------
                        <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View>
                                <CustomText style={styles.TextContainer2}>Subscription Status</CustomText>
                                <CustomText style={{ color: colors.main_color, top: 0, fontSize: 12 }}>Expiry Date:-12/12/2021</CustomText>
                            </View>
                            <TouchableOpacity onPress={() => onChangeValue(1)}  >
                                {!subscriptionValue
                                    ? <Image style={{ height: 35, width: 35, resizeMode: 'contain', tintColor: 'black' }} source={require('../../../assets/images/on.png')}></Image>
                                    : <Image style={{ height: 35, width: 35, resizeMode: 'contain', tintColor: colors.main_color }} source={require('../../../assets/images/On1.png')}></Image>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.LineStyle} />

                        ------------------ Notification-----------------
                        <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between', }}>

                            <CustomText style={styles.TextContainer2}>Notification</CustomText>
                            <TouchableOpacity onPress={() => onChangeValue(2)}  >
                                {!notificationValue
                                    ? <Image style={{ height: 35, width: 35, resizeMode: 'contain', tintColor: 'black' }} source={require('../../../assets/images/on.png')}></Image>
                                    : <Image style={{ height: 35, width: 35, resizeMode: 'contain', tintColor: colors.main_color }} source={require('../../../assets/images/On1.png')}></Image>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.LineStyle} />

                        ------------------ About Us -----------------
                        <TouchableOpacity onPress={() => navigation.navigate("AboutUs")} >
                            <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                <CustomText style={styles.TextContainer2}>About Us</CustomText>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.main_color }} source={require('../../../assets/images/Rightarrow.png')}></Image>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.LineStyle} />

                        ------------------ Contact Us -----------------
                        <TouchableOpacity onPress={() => navigation.navigate("ContactUs")} >
                            <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                <CustomText style={styles.TextContainer2}>Contact Us</CustomText>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.main_color }} source={require('../../../assets/images/Rightarrow.png')}></Image>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.LineStyle} />
                    </View>
                </ScrollView> */}
                <CustomText style={styles.textContainer}>Under Development</CustomText>
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.bg_color,
    },
    CenterView: {
        flex: 1,
        justifyContent: 'center',
    },
    LineStyle: {
        height: 1,
        marginTop: 10,
        //marginLeft: 5,
        // marginRight: 5,
        backgroundColor: 'lightgray',
        marginTop: 10,
        marginBottom: 10
    },
    viewContainer1: {
        // height: 100,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        flexDirection: 'row',
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
        })
    },
    TextContainer: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
    },
    TextContainer1: {
        textAlign: 'left',
        fontSize: 15,
        color: 'gray',
        marginTop: 5
    },
    TextContainer2: {
        textAlign: 'left',
        fontSize: 17,
        color: 'gray',
        marginTop: 3,
        marginBottom: 3
    },
    ImageContainer: {
        height: 30,
        width: 30,
        resizeMode: 'cover',
    },
    textContainer: {
        fontSize: 20,
        alignSelf: "center"
    }
});

