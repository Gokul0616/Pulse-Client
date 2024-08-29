import * as NavigationBar from "expo-navigation-bar";

const hideNavigationBar = async () => {
  await NavigationBar.setVisibilityAsync("hidden");
  await NavigationBar.setBehaviorAsync("overlay-swipe");
};

export default hideNavigationBar;
