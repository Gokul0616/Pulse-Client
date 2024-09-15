import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import Slider from "@react-native-community/slider";
import React, { useState, useRef, useEffect } from "react";

import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
const GeneralNavbar = ({ onPressFun1, titleText, onPressFun2 }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onPressFun1}>
        <Feather name="arrow-left" size={22} color={"black"} />
      </TouchableOpacity>
      <Text style={styles.headertext}>{titleText}</Text>
      <TouchableOpacity onPress={onPressFun2}>
        <Feather name="help-circle" size={22} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};
const AlertMessage = ({
  heading,
  message,
  setShowAlert,
  showAlert,
  triggerFunction,
  isRight,
  rightButtonText,
}) => {
  const navigation = useNavigation(); // Use navigation here

  return (
    <Modal visible={showAlert} transparent={true} animationType="fade">
      <View style={styles2.alertContainer}>
        <View style={styles2.alertBox}>
          <View style={{ padding: 20 }}>
            <Text style={styles2.alertTitle}>{heading}</Text>
            <Text style={styles2.alertMessage}>{message}</Text>
          </View>
          <View style={styles2.buttonContainer}>
            {isRight && (
              <TouchableOpacity
                style={[
                  styles2.alertButton,
                  styles2.alertButtonPrimary,
                  {
                    borderRightWidth: 1,
                    borderRightColor: "#ddd",
                  },
                ]}
                onPress={triggerFunction}
              >
                <Text style={styles2.alertButtonTextPrimary}>
                  {rightButtonText}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles2.alertButton, styles2.alertButtonSecondary]}
              onPress={() => {
                setShowAlert(false);
              }}
            >
              <Text style={styles2.alertButtonTextSecondary}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headertext: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Roboto-Medium",
    fontWeight: "bold",
  },
});

const styles2 = StyleSheet.create({
  alertContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Roboto-Medium",
  },
  alertMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto-Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: 10,
  },
  alertButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  alertButtonTextPrimary: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
  alertButtonTextSecondary: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto-Medium",
  },
});

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [value, setValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const video = useRef(null);
  const navigation = useNavigation();

  const changeScreenOrientation = async () => {
    if (isFullScreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
      StatusBar.setHidden(false, "slide");
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      navigation.setOptions({ tabBarStyle: { display: "none" } });
      StatusBar.setHidden(true, "slide");
    }
    setIsFullScreen(!isFullScreen);
  };

  const handlePlayPause = () => {
    if (video.current) {
      if (isPlaying) {
        video.current.pauseAsync();
      } else {
        video.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = async (sliderValue) => {
    if (video.current && duration > 0) {
      const seekPosition = (sliderValue / 100) * duration;
      await video.current.setPositionAsync(seekPosition);
      setValue(sliderValue);
    }
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setValue((status.positionMillis / status.durationMillis) * 100);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      ScreenOrientation.unlockAsync();
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
      StatusBar.setHidden(false, "slide");
    };
  }, []);

  return (
    <View style={styles3.container}>
      {isFullScreen ? null : (
        <View style={styles3.profileWrapper}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={styles3.profileImage}
              source={{ uri: "https://placekitten.com/50/50" }}
            />
            <Text style={styles3.username}>@username</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={28} color="white" />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={
          isFullScreen ? styles3.videoFullScreenWrapper : styles3.videoWrapper
        }
      >
        <Video
          ref={video}
          style={isFullScreen ? styles3.videoFullScreen : styles3.video}
          source={{
            uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
          }}
          resizeMode={"cover"}
          isLooping={true}
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        <TouchableOpacity
          style={styles3.playPauseButton}
          onPress={handlePlayPause}
        >
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={64}
            color="white"
          />
        </TouchableOpacity>
        {isFullScreen && (
          <TouchableOpacity
            style={styles3.exitFullScreenButton}
            onPress={changeScreenOrientation}
          >
            <Ionicons name="chevron-down" size={32} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {isFullScreen ? (
        <View style={styles3.controls2}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={value}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#FF0000"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FF0000"
            style={styles3.seekbar2}
          />
          <Text style={styles3.timestamp2}>
            {new Date(position).toISOString().substr(11, 8)} /{" "}
            {new Date(duration).toISOString().substr(11, 8)}
          </Text>
        </View>
      ) : (
        <View style={styles3.controls}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={value}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#FF0000"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FF0000"
            style={styles3.seekbar}
          />
          <Text style={styles3.timestamp}>
            {new Date(position).toISOString().substr(11, 8)} /{" "}
            {new Date(duration).toISOString().substr(11, 8)}
          </Text>
          <TouchableOpacity
            onPress={changeScreenOrientation}
            style={styles3.fullScreenButton}
          >
            <Ionicons
              name={isFullScreen ? "contract-outline" : "expand-outline"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
      {isFullScreen ? null : (
        <View style={styles3.actions}>
          <View
            style={{
              flexDirection: "row",
              flex: 1.2 / 3,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles3.actionButton}>
              <Ionicons name="heart-outline" size={28} color="white" />
              <Text style={{ color: "#fff" }}>15k</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles3.actionButton}>
              <Ionicons name="chatbubble-outline" size={28} color="white" />
              <Text style={{ color: "#fff" }}>15k</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles3.actionButton}>
              <Ionicons name="share-outline" size={28} color="white" />
              <Text style={{ color: "#fff" }}>15k</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles3.actionButton}>
            <Ionicons name="bookmark-outline" size={28} color="white" />
            <Text style={{ color: "#fff" }}>15k</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles3 = StyleSheet.create({
  container: {
    height: 450,
    backgroundColor: "#000",
    justifyContent: "space-around",
    alignItems: "center",
  },
  videoWrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3.5,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileWrapper: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    padding: 10,
  },
  username: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  videoFullScreenWrapper: {
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoFullScreen: {
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").width,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    marginBottom: 12,
    width: Dimensions.get("window").width,
  },
  actionButton: {
    marginLeft: 10,
  },
  playPauseButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  controls: {
    padding: 10,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seekbar: {
    flex: 1,
    marginRight: 20,
  },
  timestamp: {
    paddingTop: 5,
    fontSize: 14,
    color: "white",
  },
  controls2: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  seekbar2: {
    width: "100%",
    marginBottom: 5,
  },
  timestamp2: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  fullScreenButton: {
    paddingHorizontal: 10,
  },
  exitFullScreenButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export { GeneralNavbar, AlertMessage, VideoPlayer };
