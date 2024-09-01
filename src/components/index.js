import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Modal, Text, View, TouchableOpacity } from "react-native";
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

export { GeneralNavbar, AlertMessage };
