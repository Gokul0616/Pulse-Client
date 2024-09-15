import React, { useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import hideNavigationBar from "./src/middlewares/hiddenNavigationBar";
import GeneralNavigation from "./src/navigation/general";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const handleTouch = () => {
    hideNavigationBar();
  };

  useEffect(() => {
    hideNavigationBar();
    const intervalId = setInterval(hideNavigationBar, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleTouch}>
        <View style={styles.container}>
          <StatusBar style="inverted" />
          <GeneralNavigation />
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
