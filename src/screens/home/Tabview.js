import * as React from 'react';
import { Text, View, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'
import Notification from '../notifications/Notification'
import Setting from '../settings/Setting'
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../../utils/constants';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../../redux/providers/auth';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const SettingStack = createStackNavigator();

{/* ------------------ home ----------------- */ }
function HomeStackScreen(props) {
    const { state, handleLogout } = useAuth();
    const { navigation } = props;

    function showLogoutDialog() {
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
                        logout()
                    },
                },
            ],
            { cancelable: false },
        )
    }

    async function logout() {
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
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home}
                options={({ navigation, route }) => ({
                    headerTitle: "Home",
                    headerTitleAlign: 'center',
                    headerTintColor: colors.main_color,
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: colors.secondary_color, elevation: 0, shadowOpacity: 0 },
                    headerRight: () =>
                        <TouchableOpacity
                            onPress={() =>
                                showLogoutDialog()
                            }>
                            <Image
                                source={require('../../../assets/images/logout.png')}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor:colors.main_color,
                                    // borderRadius: 40 / 2,
                                    marginRight: 15,
                                }}

                            />
                        </TouchableOpacity>
                })} />
        </HomeStack.Navigator>
    );
}

{/* ------------------ Notification ----------------- */ }
function NotificationStackScreen() {
    return (
        <NotificationStack.Navigator>
            <NotificationStack.Screen name="Notifications" component={Notification} 
                options={({ navigation, route }) => ({
                    headerTitle: "Notification",
                    headerTitleAlign: 'center',
                    headerTintColor: colors.main_color,
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: colors.secondary_color, elevation: 0, shadowOpacity: 0 },
                    // headerRight: () =>
                    //     <TouchableOpacity
                    //         onPress={() =>
                    //             showLogoutDialog()
                    //         }>
                    //         <Image
                    //             source={require('../../../assets/images/logout.png')}
                    //             style={{
                    //                 width: 24,
                    //                 height: 24,
                    //                 tintColor:colors.main_color,
                    //                 // borderRadius: 40 / 2,
                    //                 marginRight: 15,
                    //             }}

                    //         />
                    //     </TouchableOpacity>
                })} />
        </NotificationStack.Navigator>
    );
}

{/* ------------------ Setting ----------------- */ }
function SettingStackScreen() {
    return (
        <SettingStack.Navigator>
            <SettingStack.Screen name="Settings" component={Setting} 
                options={({ navigation, route }) => ({
                    headerTitle: "Setting",
                    headerTitleAlign: 'center',
                    headerTintColor: colors.main_color,
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: colors.secondary_color, elevation: 0, shadowOpacity: 0 },
                    // headerRight: () =>
                    //     <TouchableOpacity
                    //         onPress={() =>
                    //             showLogoutDialog()
                    //         }>
                    //         <Image
                    //             source={require('../../../assets/images/logout.png')}
                    //             style={{
                    //                 width: 24,
                    //                 height: 24,
                    //                 tintColor:colors.main_color,
                    //                 // borderRadius: 40 / 2,
                    //                 marginRight: 15,
                    //             }}

                    //         />
                    //     </TouchableOpacity>
                })} />
        </SettingStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
export default function TabView() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => (
                {
                    headerTitle: "Home",
                    tabBarIcon: ({ focused }) => {
                        // console.log("route", route)

                        let icon;
                        if (route.name === 'Home') {
                            icon = require('../../../assets/images/home.png')
                        } else if (route.name == "Notifications") {
                            icon = require('../../../assets/images/notification.png')
                        } else {
                            icon = require('../../../assets/images/settings.png')
                        }

                        return <Image resizeMode="contain" style={{ height: verticalScale(25), width: scale(25), tintColor: focused ? colors.main_color : 'white' }}
                            source={icon} />
                    },


                })}
            tabBarOptions={{
                activeTintColor:  colors.main_color,
                inactiveTintColor: 'white',
                keyboardHidesTabBar: true,
                labelStyle: { textTransform: "uppercase", marginBottom: Platform.OS == "android" ? moderateScale(8) : null },
                style: { backgroundColor: colors.secondary_color, padding: Platform.OS == "android" ? moderateScale(6) : null, height: Platform.OS == "android" ? verticalScale(60) : null }
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Notifications" component={NotificationStackScreen} />
            <Tab.Screen name="Settings" component={SettingStackScreen} />
        </Tab.Navigator>
    );
}