import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity, Dimensions, Image,
    PermissionsAndroid, TouchableHighlight, Platform
} from 'react-native';
import {
    TwilioVideoLocalView, // to get local view 
    TwilioVideoParticipantView, //to get participant view
    TwilioVideo
} from 'react-native-twilio-video-webrtc';
// make sure you install vector icons and its dependencies
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { config, fonts, colors } from '../../utils/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../redux/providers/auth';
import Toast from 'react-native-tiny-toast';
import moment from 'moment';
import { CustomText } from '../../components/Text';

export default function VideoCall(props) {
    const { navigation, route } = props;
    // const { navigate } = navigation;
    const [isAudioEnabled, setAudioEnabled] = useState(true)
    const [isVideoEnabled, setVideoEnabled] = useState(true)
    const [isButtonDisplay, setButtonDisplay] = useState(true)
    const [status, setStatus] = useState("disconnected")
    const [participants, setParticipants] = useState(new Map())
    const [videoTracks, setVideoTracks] = useState(new Map())
    const startTime = new Date().getTime()
    const [currentTime, setCurrentTime] = useState("00:00:00")
    const [visibleDuration, setVisibleDuration] = useState(false)

    const [error, setError] = useState("")

    var twilioVideo = useRef(null)
    const { state, handleConsultationStart, handleConsultationStop, handleJoinRoom } = useAuth();
    const user = state.user;

    var roomName = "your_room_name_here"
    var token = "your_twilio_key_here"

    useEffect(() => {
        GetAllPermissions()
    }, [])

    async function GetAllPermissions() {
        if (Platform.OS == "android") {
            PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]).then((result) => {
                console.log("result", result)
                if (result['android.permission.CAMERA'] == "granted" &&
                    result['android.permission.WRITE_EXTERNAL_STORAGE'] == "granted" &&
                    result['android.permission.RECORD_AUDIO'] == "granted") {
                    _onConnectButtonPress()
                } else {
                    Alert.alert("Please grant all permission to access this feature")
                }
            }).catch((reason) => {
                console.log("reason", reason)
            })
        } else {
            onConnectButtonPress()
        }
    }


    function showDuration() {
        setVisibleDuration(true)
        console.log("timer", startTime)
        let timer = setInterval(() => {
            let time = new Date().getTime() - startTime
            let ctime = moment(time).utc(false).format("HH:mm:ss")
            setCurrentTime(ctime)
            // console.log("count", ctime)
        }, 1000);

        return () => clearInterval(timer)
    }





    function _onConnectButtonPress() {
        console.log("twilioVideo123", twilioVideo.current.connect)
        console.log("in on connect button preess");
        twilioVideo.current.connect({ roomName: roomName, accessToken: token })
        setStatus("connecting")
        console.log(status);
    }

    function _onEndButtonPress() {
        twilioVideo.current.disconnect()
        navigation.pop()
    }

    function _onMuteButtonPress() {
        // on cliking the mic button we are setting it to mute or viceversa
        twilioVideo.current.setLocalAudioEnabled(!isAudioEnabled)
            .then(isEnabled => setAudioEnabled(isEnabled))
    }

    function _onFlipButtonPress() {
        // switches between fronst camera and Rare camera
        twilioVideo.current.flipCamera()
    }

    function _onRoomDidConnect() {
        console.log("room did connected");
        setStatus("connected")
        // console.log("over");
        setError("")
    }

    function _onRoomDidDisconnect({ roomName, error }) {
        console.log("_onRoomDidDisconnect: ", JSON.stringify(error))
        console.log("disconnected")
        setStatus("disconnected")
    }

    function _onRoomDidFailToConnect(error) {
        console.log("_onRoomDidFailToConnect: ", JSON.stringify(error));
        console.log("failed to connect");
        setStatus("disconnected")
        setError("Please add valid roomname and token in the code.")
    }

    function _onParticipantAddedVideoTrack({ participant, track }) {
        // call everytime a participant joins the same room
        console.log("onParticipantAddedVideoTrack: ", participant, track)
        setVideoTracks(new Map([
            ...videoTracks,
            [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
        ]))
        console.log("this.state.videoTracks", videoTracks);
    }

    function _onParticipantRemovedVideoTrack({ participant, track }) {
        // gets called when a participant disconnects.
        console.log("onParticipantRemovedVideoTrack: ", participant, track)
        const videoTracksLocal = videoTracks;
        videoTracksLocal.delete(track.trackSid);
        setVideoTracks(videoTracksLocal);
    }


    return (
        <View style={styles.container} >
            {
                (status === 'connected' || status === 'connecting') &&
                <View style={styles.callContainer}>
                    {
                        status === 'connected' &&
                        <View style={styles.remoteGrid}>
                            <TouchableOpacity style={styles.remoteVideo} onPress={() => { setButtonDisplay(!isButtonDisplay) }} >
                                {
                                    Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                                        return (
                                            <TwilioVideoParticipantView
                                                style={styles.remoteVideo}
                                                key={trackSid}
                                                trackIdentifier={trackIdentifier}
                                            />
                                        )
                                    })
                                }
                            </TouchableOpacity>
                            <TwilioVideoLocalView
                                enabled={true}
                                style={isButtonDisplay ? styles.localVideoOnButtonEnabled : styles.localVideoOnButtonDisabled}
                            />
                        </View>
                    }
                    <View
                        style={
                            {
                                display: isButtonDisplay ? "flex" : "none",
                                position: "absolute",
                                left: 0,
                                bottom: 0,
                                right: 0,
                                paddingBottom: moderateScale(10),
                                // height: 100,
                                // flexDirection: "row",
                                alignItems: "center",
                                // justifyContent: "space-evenly",
                                // backgroundColor:"blue",
                                // zIndex: 2,
                                zIndex: isButtonDisplay ? 2 : 0,
                            }
                        } >
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            width: "100%"
                        }}>
                            <TouchableOpacity
                                style={
                                    {
                                        display: isButtonDisplay ? "flex" : "none",
                                        width: 60,
                                        height: 60,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderRadius: 100 / 2,
                                        backgroundColor: 'grey',
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }
                                }
                                onPress={_onMuteButtonPress}>
                                < MIcon name={isAudioEnabled ? "mic" : "mic-off"} size={24} color='#fff' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    {
                                        display: isButtonDisplay ? "flex" : "none",
                                        width: 60,
                                        height: 60,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderRadius: 100 / 2,
                                        backgroundColor: '#ff005e',
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }
                                }
                                onPress={_onEndButtonPress}>
                                < MIcon name="call-end" size={28} color='#fff' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    {
                                        display: isButtonDisplay ? "flex" : "none",
                                        width: 60,
                                        height: 60,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        borderRadius: 100 / 2,
                                        backgroundColor: 'grey',
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }
                                }
                                onPress={_onFlipButtonPress}>
                                < MCIcon name="rotate-3d" size={28} color='#fff' />
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ alignItems: "center", alignSelf: "center", marginTop: moderateScale(10) }}>
                            <CustomText bold style={styles.counterText}>{patientData.firstname + " " + patientData.lastname}</CustomText>
                            {visibleDuration ? <CustomText style={styles.counterText1}>{currentTime}</CustomText> : console.log("")}
                        </View> */}
                    </View>
                    <View
                        style={
                            {
                                display: isButtonDisplay ? "flex" : "none",
                                position: "absolute",
                                left: 0,
                                top: 0,
                                right: 0,
                                height: 50,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                // backgroundColor:"blue",
                                // zIndex: 2,
                                zIndex: isButtonDisplay ? 2 : 0,
                            }
                        } >
                        <TouchableOpacity activeOpacity={0.8} style={{ margin: moderateScale(12), position: "absolute", left: 0 }} onPress={() => navigation.pop()}>
                            <Image style={{ height: verticalScale(36), width: scale(36), resizeMode: 'contain', tintColor: colors.primary_color }} source={require("../../../assets/images/left.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <TwilioVideo
                ref={twilioVideo}
                onRoomDidConnect={_onRoomDidConnect}
                onRoomDidDisconnect={_onRoomDidDisconnect}
                onRoomDidFailToConnect={_onRoomDidFailToConnect}
                onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
                onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
            />
            <Text style={{ alignSelf: "center", textAlign: "center", bottom: 100, fontSize: 20, position: "absolute", color: "black" }}>{error}</Text>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_bg_color
    },
    callContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        minHeight: "100%"
    },
    button: {
        marginTop: 100
    },
    localVideoOnButtonEnabled: {
        bottom: ("96%"),
        width: "35%",
        left: "63%",
        height: "25%",
        zIndex: 2,
    },
    localVideoOnButtonDisabled: {
        bottom: ("96%"),
        width: "35%",
        left: "63%",
        height: "25%",
        zIndex: 2,
    },
    remoteGrid: {
        flex: 1,
        flexDirection: "column",
    },
    remoteVideo: {
        width: "100%",
        height: "100%",
        zIndex: 1,
    },
    counterText: {
        fontSize: moderateScale(20),
        color: colors.accent_color,
        marginTop: moderateScale(5),
        textAlign: "center"
    },
    counterText1: {
        fontSize: moderateScale(16),
        color: colors.accent_color,
        marginTop: moderateScale(5),
        textAlign: "center"
    }
});
