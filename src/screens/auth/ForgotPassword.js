import React, { useState } from 'react';
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
import Toast from 'react-native-tiny-toast';
import { colors, config } from '../../utils/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { CustomText } from '../../components/Text';

export default function ForgotPassword(props) {
    console.log("props", props)
    const { navigation } = props;
    const { navigate } = navigation;

    //1 - DECLARE VARIABLES
    const [email, setEmail] = useState("");
    const { handleForgotPassword } = useAuth();

    function callApiforFogotPassword() {
        Toast.showLoading("Please wait..")

        handleForgotPassword(email)
            .then((response) => {
                Toast.hide()
                console.log("res: ", response)
                Toast.showSuccess(response.message)
                navigate('Login')
            })
            .catch((error) => {
                Toast.hide()
                console.log(error.message);
                Toast.show(error.message)
            })
    }

    function forgotPassword() {
        if (email == '') {
            Toast.show("Please Enter your Email")
        } else if (config.EMAIL_REG.test(email) === false) {
            Toast.show('Please Enter valid Email')
        } else {
            callApiforFogotPassword()
        }
    }

    return (
        <View style={styles.MainContainer}>
            {/* <ImageBackground style={{ width: "100%", height: "100%", position: "absolute" }} resizeMode={"cover"} source={require("../../../assets/images/login_bg.png")} /> */}
            <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={Platform.select({ ios: Dimensions.get('window').height == 812 || Dimensions.get('window').width == 812 ? 85 : 64, android: -500 })}>
                {/* ------------------CenterView ----------------- */}
                <View style={styles.CenterView} >



                    <View height={verticalScale(30)} />

                    <Image style={{ height: verticalScale(140), width: scale(140), margin: moderateScale(10), resizeMode: 'contain', alignSelf: 'center' }} source={require('../../../assets/images/app_logo.png')} />

                    <View height={verticalScale(20)} />

                    <View style={styles.cardView}>

                        <CustomText style={{ fontSize: moderateScale(16), fontWeight: "400", textAlign: "center", margin: moderateScale(20) }}>Confirm your email and we'll send the instructions.</CustomText>

                        {/* ------------------ Email ----------------- */}
                        <CustomTextInput
                            placeholder='Email'
                            keyboardType={"email-address"}
                            textContentType={"emailAddress"}
                            // icon={require('../../../assets/images/emailicon.png')}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            maxLength={50}
                        />
                        <View marginTop={0} height={verticalScale(30)} />

                        <CustomButton title="Reset Password" onPress={() => forgotPassword()} />

                        <View marginTop={0} height={verticalScale(20)} />

                    </View>
                </View>
                <TouchableOpacity style={{ position: "absolute", marginTop: moderateScale(35), marginLeft: moderateScale(20) }} onPress={() => navigation.pop()}>
                    <Image style={{ height: verticalScale(36), width: scale(36), resizeMode: 'contain', tintColor: colors.main_color }} source={require("../../../assets/images/left.png")} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
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
        flex: 1,
        width: Dimensions.get('window').width,
        padding: moderateScale(20),
        marginTop: moderateScale(20)
    },
    cardView: {
        margin: moderateScale(6),
        borderRadius: moderateScale(16),
        backgroundColor: colors.card_color,
        padding: moderateScale(8),
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
});