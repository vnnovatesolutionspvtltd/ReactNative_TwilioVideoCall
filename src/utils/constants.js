//API Base URL
export const API_URL = 'BASE_URL_HERE';

//API End Points
export const LOGIN = `${API_URL}/login`;
export const REGISTER = `${API_URL}/register`;
export const SOCIAL_LOGIN = `${API_URL}/social-login`;
export const VERIFY_OTP = `${API_URL}/verify-otp`;
export const RESEND_OTP = `${API_URL}/resend-otp`;
export const FORGOT_PASSWORD = `${API_URL}/forgot-password`;
export const USER_PROFILE = `${API_URL}/user-profile`;

export const colors = {
    main_color: "#00FF00",
    secondary_color: "#5C5BF4",
    accent_color: "#2F2F2F",
    drawer_color: "rgba(0, 253, 253, 0.6)",
    bg_color: "#EFF0F1",
    loadingBG_color: "rgba(0, 0, 0, 0.1)",
    card_color: "rgba(255, 255, 255, 0.9)",
    border_color:'grey'
}

// social_type (1-facebook, 2-google, 3-Apple)
export const social_type = {
    FACEBOOK: 1,
    GOOGLE: 2,
    APPLE: 3
}

export const fonts = {
    opensans_light: "OpenSans-Light",
    opensans_regular: "OpenSans-Regular",
    opensans_bold: "OpenSans-Bold",
    raleway_light: "Raleway-Light",
    raleway_regular: "Raleway-Regular",
    raleway_bold: "Raleway-Bold",
}

export const config = {
    showTextInputIcons: false,
    EMAIL_REG: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    currency: "$",
    stripe_api_key: "your_stripe_api_key_here",
    terms_url: "TERMS_CONDITIONS_URL_HERE",
    privacy_url: "PRIVACY_POLICY_URL_HERE"
}

export default {
    colors, config, social_type, fonts
}