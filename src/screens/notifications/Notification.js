import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, Image, View, Button, ActivityIndicator, Alert, ScrollView, Dimensions, StyleSheet, FlatList, SectionList } from 'react-native';
import { CustomText } from '../../components/Text';
import { useAuth } from '../../redux/providers/auth';
import { colors } from '../../utils/constants';

export default function Notification(props) {
    const { navigate } = props.navigation;

    //1 - DECLARE VARIABLES
    const [notificationList, setNotificationList] = useState(
        [
            {
                title: 'Order Notification',
                data: ['Order received', 'Order processed', 'Order completed', 'Monthly subscription payment slip', 'Notification 5',
                    'Notification 6', 'Notification 7',]
            },

            {
                title: 'Event Notification',
                data: ['Live Event Started', 'Notification 2', 'Notification 3', 'Notification 4', 'Notification 5',
                    'Notification 6', 'Notification 7', ]
            },

        ]
    )
    const { state, handleLogout } = useAuth();
    const user = state.user;

    function render({ item, index }) {
        return <TouchableOpacity >
            <View style={{ flexDirection: 'row', alignItems: "center", margin: 5 }}>
                <Image style={styles.ImageContainer} source={require("../../../assets/images/dot.png")}></Image>
                <View width={10} />
                <CustomText style={{ color: 'black',fontSize: 14 }}>{item}</CustomText>
            </View>
        </TouchableOpacity >

    }

    function renderSectionHeader({ section }) {
        return <View style={[styles.LineStyle, { height: 35, opacity: 0.8, justifyContent: 'center', marginTop: 10 }]}>
            <CustomText style={{ fontSize: 16, marginLeft: 10, fontWeight: 'bold', color: 'black' }}>{section.title}</CustomText>
        </View>
    }

    return (
        <View style={styles.MainContainer}>
            <View style={styles.CenterView} >
                {/* <View style={styles.SubContainer}>
                    <SectionList
                        sections={notificationList}
                        renderItem={render}
                        renderSectionHeader={renderSectionHeader}
                        keyExtractor={(item, index) => index}
                    />
                </View> */}
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
        justifyContent: 'center',
    },
    SubContainer: {
        width: Dimensions.get('window').width,
        marginTop: 0,
        marginLeft: 0,
        marginLeft: 0,
        backgroundColor: 'transparent',
    },
    LineStyle: {
        height: 1,
        // marginTop: 10,
        backgroundColor: 'lightgray',
        width: Dimensions.get('window').width
    },
    ImageContainer: {
        width: 10,
        height: 10,
        margin: 5,
        tintColor: 'grey'
    },
    textContainer: {
        fontSize: 20,
        alignSelf: "center"
    }
});

