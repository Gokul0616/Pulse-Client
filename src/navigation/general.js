import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import hideNavigationBar from "../middlewares/hiddenNavigationBar";
import {
  CreateAccountScreen as SignupScreen,
  SignInScreen,
  AuthScreen,
} from "../screens/AuthScreens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
export default function GeneralNavigation() {
  React.useEffect(() => {
    hideNavigationBar();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="SigninScreen" component={SignInScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} /> */}
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        // tabBarStyle: {
        //   backgroundColor: "lightgrey",
        // },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={HomeScreen} // Change this to your ExploreScreen
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={HomeScreen} // Change this to your ProfileScreen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
