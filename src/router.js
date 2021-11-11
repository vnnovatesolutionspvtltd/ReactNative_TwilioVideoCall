import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './redux/providers/auth';
import Splash from './screens/auth/Splash'
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import VideoCall from './screens/auth/VideoCall';
import ForgotPassword from './screens/auth/ForgotPassword'
import TabView from './screens/home/Tabview';

const Stack = createStackNavigator();

export default function Router() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                    <Stack.Screen name="VideoCall" component={VideoCall} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="TabHome" component={TabView}
                        options={({ navigation, route }) => (
                            {
                                headerShown: false,
                            })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}