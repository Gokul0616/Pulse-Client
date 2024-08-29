import { StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

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
      <View style={styles.alertContainer}>
        <View style={styles.alertBox}>
          <View style={{ padding: 20 }}>
            <Text style={styles.alertTitle}>{heading}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {isRight && (
              <TouchableOpacity
                style={[
                  styles.alertButton,
                  styles.alertButtonPrimary,
                  {
                    borderRightWidth: 1,
                    borderRightColor: "#ddd",
                  },
                ]}
                onPress={triggerFunction}
              >
                <Text style={styles.alertButtonTextPrimary}>
                  {rightButtonText}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.alertButton, styles.alertButtonSecondary]}
              onPress={() => {
                setShowAlert(false);
              }}
            >
              <Text style={styles.alertButtonTextSecondary}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertMessage;

const styles = StyleSheet.create({
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
