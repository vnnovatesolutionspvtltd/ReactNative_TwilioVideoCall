import React, { useEffect, useRef, useState } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Alert,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ImageBackground
} from 'react-native';
import { useAuth } from '../../redux/providers/auth';
import { CustomTextInput } from '../../components/TextInput';
import { CustomButton } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast';
import { colors, config, social_type } from '../../utils/constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { CommonActions } from '@react-navigation/native';
import { CustomText } from '../../components/Text';

var socialInitialCheck = true

export default function Login(props) {
    // console.log("props", props)
    const { navigation } = props;
    const { navigate } = navigation;

   
    //1 - DECLARE VARIABLES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { handleLogin, handleSocialLogin, handleSendOTP } = useAuth();
    var passwordRef = useRef(null)

  
  
  

    function callApiforLogin() {
        Toast.showLoading("Please wait..")

        handleLogin(email, password)
            .then((response) => {
                Toast.hide()
                console.log("res: ", response)
                if (response.status == 1) {
                    Toast.showSuccess(response.message)
                    // navigation.navigate('SubscriptionPage')
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'TabHome' },
                            ],
                        })
                    );
                } else if (response.status == 2) {
                    Toast.show(response.message)
                    navigation.navigate('OTPVerification', { email, password })
                }
            })
            .catch((error) => {
                Toast.hide()
                console.log(error.message);
                Toast.show(error.message)
            })
    }

    function signIn() {
        navigation.navigate('TabHome')
        return

        if (email == '') {
            Toast.show("Please Enter Email Address")
        } else if (config.EMAIL_REG.test(email) === false) {
            Toast.show('Please Enter Valid Email Address')
        } else if (password == '') {
            Toast.show("Please Enter Password")
        } else {
            callApiforLogin()
        }
    }

    

   
  

   
   
    return (
        < View style={styles.MainContainer} >
            {/* <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}> */}
            {/* <ImageBackground style={{ width: "100%", height: "100%", position: "absolute" }} resizeMode={"cover"} source={require("../../../assets/images/login_bg.png")} /> */}
            {/* <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={Platform.select({ ios: Dimensions.get('window').height == 812 || Dimensions.get('window').width == 812 ? 85 : 64, android: -500 })}> */}
            {/* ------------------CenterView ----------------- */}
            <View style={styles.CenterView} >
                <View height={verticalScale(10)} />
                <Image style={{ height: verticalScale(140), width: scale(140), resizeMode: 'contain', alignSelf: 'center' }} source={require('../../../assets/images/app_logo.png')} />

                <View height={verticalScale(10)} />

                <View style={styles.cardView}>

                    <CustomText style={styles.HeaderText}>LOGIN</CustomText>

                    {/* ------------------ Email ----------------- */}
                    <CustomTextInput
                        placeholder='Email'
                        keyboardType={"email-address"}
                        textContentType={"emailAddress"}
                        // icon={require('../../../assets/images/emailicon.png')}
                        onChangeText={(text) => setEmail(text)}
                        returnKeyType={"next"}
                        blurOnSubmit={false}
                        onSubmitEditing={() => passwordRef.focus()}
                        value={email}
                        maxLength={50}
                    />
                    <View marginTop={0} height={verticalScale(15)} />

                    {/* ------------------ Password ----------------- */}
                    <CustomTextInput
                        textInputRef={(ref) => passwordRef = ref}
                        placeholder='Password'
                        secureTextEntry={!showPassword}
                        textContentType={"password"}
                        icon={require('../../../assets/images/passwordicon.png')}
                        onChangeText={(text) => setPassword(text)}
                        setHidePass={(value) => {
                            console.log(value)
                            setShowPassword(!value)
                        }}
                        value={password}
                        maxLength={25}
                    />
                    <View marginTop={0} height={verticalScale(10)} />

                    {/* ------------------ Forgot Password ----------------- */}
                    <View style={{ alignSelf: "flex-end" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <CustomText style={[styles.TextBlack1]}>Forgot password?</CustomText>
                        </TouchableOpacity>
                    </View>

                    <View marginTop={0} height={verticalScale(12)} />

                    <CustomButton title="Login" onPress={() => {
                        console.log("login attempted")
                        signIn()
                    }} />

                    <View marginTop={0} height={verticalScale(20)} />

                </View>

                <View marginTop={0} height={verticalScale(15)} />

                <View style={{ alignItems: 'center', flexDirection: "row", marginStart: moderateScale(25), marginEnd: moderateScale(25) }}>
                    <View style={styles.lineView} />
                    <CustomText style={styles.TextBlack1}>OR</CustomText>
                    <View style={styles.lineView} />
                </View>

                <View marginTop={0} height={verticalScale(5)} />

              
                <View marginTop={0} height={verticalScale(20)} />
                {/* ------------------ Horizontal Container ----------------- */}

                <View style={styles.ViewContainer1}>
                    <CustomText style={[styles.TextBlack1, { margin: 0, fontSize: moderateScale(14) }]}>Don't have an account?</CustomText>
                    <CustomButton
                        title="Sign up"
                        buttonStyle={{ paddingStart: moderateScale(10), paddingEnd: moderateScale(10), paddingTop: moderateScale(5), paddingBottom: moderateScale(5) }}
                        textStyle={{ fontSize: moderateScale(12) }}
                        onPress={() => {
                            navigate("Register")
                        }} />
                </View>

            </View>
            {/* </KeyboardAvoidingView> */}
            {/* </ScrollView> */}
        </View >
    );
};

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: colors.bg_color,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CenterView: {
        width: Dimensions.get('window').width,
        flex: 1,
        padding: moderateScale(20)
    },
    cardView: {
        margin: moderateScale(6),
        borderRadius: moderateScale(16),
        backgroundColor: colors.card_color,
        padding: moderateScale(6),
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
    ViewContainer1: {
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        marginTop: moderateScale(8),
        marginBottom: moderateScale(8)
    },
    TextBlack1: {
        margin: moderateScale(8),
        color: colors.accent_color,
        fontSize: moderateScale(14),
        textAlign: 'center'
    },
    lineView: {
        height: 1,
        backgroundColor: colors.accent_color,
        flex: 1
    },
    HorizontalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
    },
    ButtonContainer: {
        backgroundColor: 'white',
        margin: moderateScale(10),
        padding: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        borderRadius: moderateScale(35),
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
        }),
    },
    HeaderText: {
        color: colors.accent_color,
        fontSize: moderateScale(26),
        textAlign: 'center',
        margin: moderateScale(16)
    },
    imageContainer: {
        height: verticalScale(26),
        width: scale(26),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    appleBtn: { height: verticalScale(60), width: scale(60), margin: moderateScale(10) }
});