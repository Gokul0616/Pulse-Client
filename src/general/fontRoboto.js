import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";

const Font = () => {
  const [loaded, error] = useFonts({
    "Roboto-Medium": require("../../assets/font/Roboto-Medium.ttf"),
    "Roboto-Light": require("../../assets/font/Roboto-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return loaded;
};

const fontRoboto = StyleSheet.create({
  fontRoboto: {
    fontFamily: "Roboto-Medium",
  },
  fontRobotoLight: {
    fontFamily: "Roboto-Light",
  },
});

export { Font, fontRoboto };
