import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
export default GeneralNavbar;
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
