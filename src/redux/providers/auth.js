import React, { useMemo, useReducer, useContext } from 'react';
import Global from '../../utils/global';

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, { initialState, LOGGED_IN, LOGGED_OUT } from "../reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch from '../../services/fetch';
import {
    FORGOT_PASSWORD, LOGIN, REGISTER, RESEND_OTP, SOCIAL_LOGIN, VERIFY_OTP, USER_PROFILE
} from '../../utils/constants';

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const EMAIL_KEY = 'email';
export const ROLE_KEY = 'role';

export const keys = [TOKEN_KEY, USER_KEY, EMAIL_KEY, ROLE_KEY];

// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    // Get Auth state
    const getAuthState = async () => {
        try {
            //GET TOKEN && USER
            let token = await AsyncStorage.getItem(TOKEN_KEY);
            let user = await AsyncStorage.getItem(USER_KEY);
            let email = await AsyncStorage.getItem(EMAIL_KEY)
            let role = await AsyncStorage.getItem(ROLE_KEY)

            console.log("user: ", user)

            if (!token || token == "") {
                await handleLogout();
                return { isLoggedIn: false };
            } else {
                Global.setToken(token)
                let res = await handleUserProfile()
                if (res.message == "Unauthenticated.") {
                    await handleLogout();
                    return { isLoggedIn: false };
                }
                return { isLoggedIn: true };
                //DISPATCH TO REDUCER
                // dispatch({ type: LOGGED_IN, user: JSON.parse(user) });
            }
        } catch (error) {
            throw new Error(error)
        }
    };

    // Handle Login
    const handleUserProfile = async () => {
        try {
            let data = {}
            let res = await fetch.get(USER_PROFILE, data)
            if (res.status == 1) {
                let user = res.data
                let strUser = JSON.stringify(user)
                console.log("struser: ", strUser)

                let data_ = [[USER_KEY, strUser], [TOKEN_KEY, user.token]];
                Global.setToken(user.token)

                await AsyncStorage.multiSet(data_);

                //DISPATCH TO REDUCER
                dispatch({ type: LOGGED_IN, user });
            }
            return res

        } catch (error) {
            throw new Error(error);
        }
    };

    // Handle Login
    const handleLogin = async (email, password) => {
        try {
            let data = {
                email, password
            }
            let res = await fetch.post(LOGIN, data)
            if (res.status == 1) {
                let user = res.data
                let strUser = JSON.stringify(user)
                console.log("struser: ", strUser)

                let data_ = [[USER_KEY, strUser], [TOKEN_KEY, user.token]];
                Global.setToken(user.token)

                await AsyncStorage.multiSet(data_);

                //DISPATCH TO REDUCER
                dispatch({ type: LOGGED_IN, user });
            }
            return res

        } catch (error) {
            throw new Error(error);
        }
    };

    // Handle Login
    const handleSocialLogin = async (social_id, social_type, first_name, last_name, email, profile_url, otp) => {
        try {
            let data = {
                social_id, social_type, first_name, last_name, email, profile_url, otp
            }
            let res = await fetch.post(SOCIAL_LOGIN, data)
            if (res.status == 1) {
                let user = res.data
                let strUser = JSON.stringify(user).toString()
                console.log("struser: ", strUser)

                let data_ = [[USER_KEY, strUser], [TOKEN_KEY, user.token]];
                Global.setToken(user.token)

                await AsyncStorage.multiSet(data_);

                //DISPATCH TO REDUCER
                dispatch({ type: LOGGED_IN, user });
            }
            return res

        } catch (error) {
            throw new Error(error);
        }
    };

    // Handle Login
    const handleSendOTP = async (email) => {
        try {
            let data = {
                email
            }
            let res = await fetch.post(RESEND_OTP, data)

            return res

        } catch (error) {
            throw new Error(error);
        }
    };

    // Handle Login
    const handleVerifyOTP = async (email, otp) => {
        try {
            let data = {
                email, otp
            }
            let res = await fetch.post(VERIFY_OTP, data)

            return res

        } catch (error) {
            throw new Error(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            //REMOVE DATA
            await AsyncStorage.multiRemove(keys);

            //AXIOS AUTHORIZATION HEADER
            // delete axios.defaults.headers.common["Authorization"];

            //DISPATCH TO REDUCER
            dispatch({ type: LOGGED_OUT });
        } catch (error) {
            throw new Error(error);
        }
    };

    // Handle Login
    const handleRegister = async (firstname, lastname, user_role, email, password, address, city, postal_code, state) => {
        try {
            let data = {
                firstname, lastname, user_role, email, password, address1: address, address2: "", city, postal_code, state, country: "Canada"
            }
            let res = await fetch.post(REGISTER, data)
            return res

        } catch (error) {
            throw new Error(error);
        }
    };

    // Handle Login
    const handleForgotPassword = async (email) => {
        try {
            let data = {
                email
            }
            let res = await fetch.post(FORGOT_PASSWORD, data)
            return res

        } catch (error) {
            throw new Error(error);
        }
    };

    //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
    const updateUser = async (user) => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            dispatch({ type: LOGGED_IN, user }); //DISPATCH TO REDUCER
        } catch (error) {
            throw new Error(error);
        }
    };

    const value = useMemo(() => {
        return {
            state, getAuthState, handleLogin, handleSocialLogin, handleRegister, handleForgotPassword, handleUserProfile,
            handleSendOTP, handleVerifyOTP, handleLogout, updateUser
        };
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;