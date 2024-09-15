import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Font, fontRoboto } from "../general/fontRoboto";
import { useState } from "react";
import { GeneralNavbar, AlertMessage } from "../components";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const temporaryEmailDomains = [
  "tempmail.com",
  "10minutemail.com",
  "mailinator.com",
  "guerrillamail.com",
  "maildrop.cc",
  "inbox.lv",
  "yopmail.com",
  "mailnesia.com",
  "sharklasers.com",
  "fakemail.app",
  "trashmail.com",
  "dispostable.com",
  "fastmail.com",
  "emailfake.com",
  "getairmail.com",
  "fakemail.net",
  "dodgeit.com",
  "throwawaymail.com",
  "spamgourmet.com",
  "tempmail.net",
  "mailinator.net",
  "mytemp.email",
  "zippymail.info",
  "mailinator.org",
  "guerrillamail.net",
  "mailinator.co",
  "spambox.us",
  "mailcatch.com",
  "spambox.me",
  "spambox.online",
  "fakeinbox.com",
  "spambox.email",
  "maildrop.org",
];

const isTemporaryEmail = (email) => {
  const domain = email.split("@")[1];
  return temporaryEmailDomains.includes(domain.toLowerCase());
};

const CreateAccountScreen = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [step, setStep] = useState("enterPhoneOrEmail");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleNext = () => {
    if (step === "enterPhoneOrEmail") {
      if (!inputValue.trim()) {
        setAlertMessage("Please enter your phone number or email.");
        setShowAlert(true);
        return;
      }
      if (emailRegex.test(inputValue)) {
        if (isTemporaryEmail(inputValue)) {
          setAlertMessage(
            "Please use a valid email address, temporary emails are not allowed."
          );
          setShowAlert(true);
          return;
        }
        setStep("enterOTP");
      } else if (phoneRegex.test(inputValue)) {
        setStep("enterOTP");
      } else {
        setAlertMessage("Please enter a valid phone number or email.");
        setShowAlert(true);
      }
    } else if (step === "enterOTP") {
      if (!otpValue.trim()) {
        setAlertMessage("Please enter the OTP.");
        setShowAlert(true);
        return;
      }
      setStep("enterPassword");
    } else if (step === "enterPassword") {
      if (!passwordValue.trim()) {
        setAlertMessage("Please enter a password.");
        setShowAlert(true);
        return;
      }
      setStep("enterPersonalDetails");
    } else if (step === "enterPersonalDetails") {
      if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
        setAlertMessage("Please fill out all required fields.");
        setShowAlert(true);
        return;
      }
      const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dobRegex.test(dob)) {
        setAlertMessage("Date of Birth must be in the format YYYY-MM-DD.");
        setShowAlert(true);
        return;
      }
      console.log({
        userInfo: inputValue,
        profilePicture,
        firstName,
        lastName,
        dob,
        gender,
      });
      navigation.navigate("Home");
    }
  };

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setAlertMessage("Permission to access camera roll is required!");
      setShowAlert(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <GeneralNavbar
        onPressFun1={() => navigation.goBack()}
        titleText={
          step === "enterPhoneOrEmail"
            ? "Sign Up"
            : step === "enterOTP"
            ? "Verify"
            : step === "enterPassword"
            ? "Password"
            : "Personal Details"
        }
      />
      {(step === "enterPhoneOrEmail" ||
        step === "enterOTP" ||
        step === "enterPassword") && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {step === "enterOTP"
              ? "Verify OTP"
              : step === "enterPassword"
              ? "Create Password"
              : step === "enterPhoneOrEmail"
              ? "Create Account"
              : null}
          </Text>
        </View>
      )}
      {step === "enterPhoneOrEmail" ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Phone or Email"
            cursorColor={"#ff4040"}
            keyboardType="email-address"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
        </View>
      ) : step === "enterOTP" ? (
        <View style={styles.inputContainer}>
          <Text style={styles.otpText}>Enter the OTP sent to {inputValue}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter OTP"
            cursorColor={"#ff4040"}
            keyboardType="number-pad"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={otpValue}
            onChangeText={(text) => setOtpValue(text)}
          />
        </View>
      ) : step === "enterPassword" ? (
        <View style={styles.inputContainer}>
          <Text style={styles.otpText}>
            Make sure Don't forget your password
          </Text>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Create Password"
              cursorColor={"#ff4040"}
              placeholderTextColor="#888"
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              value={passwordValue}
              onChangeText={(text) => setPasswordValue(text)}
            />
            <TouchableOpacity
              style={styles3.eyeIcon}
              onPress={togglePasswordVisibility}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles2.container2}>
          <View style={styles2.headerContainer}>
            <Text style={styles2.headerText}>Complete Your Profile</Text>
          </View>

          <View style={styles2.profilePictureContainer}>
            <TouchableOpacity onPress={handleImagePick}>
              <View style={styles2.profileImageWrapper}>
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    style={styles2.profileImage}
                  />
                ) : (
                  <Image
                    source={require("../../assets/appImages/emptyProfile.jpg")}
                    style={styles2.profileImage}
                  />
                )}

                <View style={styles2.overlay}></View>

                <View style={styles2.cameraIconContainer}>
                  <Image
                    source={require("../../assets/appImages/profilecamera.png")}
                    style={styles2.cameraIcon}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles2.inputContainer}>
            <TextInput
              style={styles2.textInput}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles2.textInput}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles2.textInput}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={dob}
              onChangeText={setDob}
            />
            <TextInput
              style={styles2.textInput}
              placeholder="Gender (Optional)"
              value={gender}
              onChangeText={setGender}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
      {(step === "enterPhoneOrEmail" ||
        step === "enterOTP" ||
        step === "enterPassword") && (
        <TouchableOpacity style={styles.signUpButton} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {step === "enterPhoneOrEmail"
              ? "Next"
              : step === "enterOTP"
              ? "Verify"
              : "Submit"}
          </Text>
        </TouchableOpacity>
      )}
      {step === "enterPhoneOrEmail" && (
        <>
          <View style={styles.orContainer}>
            <Text style={styles.orText}>OR</Text>
          </View>

          <TouchableOpacity style={styles.signUpButton}>
            <Image
              source={require("../../assets/appImages/icon/google.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Sign up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton}>
            <Image
              source={require("../../assets/appImages/icon/facebook.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Sign up with Facebook</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <AlertMessage
        heading="Error"
        message={alertMessage}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        triggerFunction={() => setShowAlert(false)}
        isRight={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto-Medium",
  },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  textInput: {
    height: 50,
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#E8E8E8",
    fontFamily: "Roboto-Medium",
  },
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Roboto-Medium",
  },
  orContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  orText: {
    fontSize: 16,
    color: "#888",
    fontFamily: "Roboto-Medium",
  },
  otpText: {
    marginBottom: 20,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  signInText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 5,
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto-Medium",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 60,
  },
  cameraIconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    tintColor: "#fff",
    height: 30,
    width: 30,
  },
  inputContainer: {
    marginTop: 20,
  },
  textInput: {
    height: 50,
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#E8E8E8",
    marginBottom: 15,
    fontFamily: "Roboto-Medium",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Roboto-Medium",
  },
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // New state for toggling password visibility
  const [step, setStep] = useState("signIn"); // signIn or forgotPassword
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = () => {
    if (!inputValue.trim() || !passwordValue.trim()) {
      setAlertMessage("Please enter your email/phone and password.");
      setShowAlert(true);
      return;
    }

    if (!emailRegex.test(inputValue) && !phoneRegex.test(inputValue)) {
      setAlertMessage("Please enter a valid email or phone number.");
      setShowAlert(true);
      return;
    }

    console.log({
      inputValue,
      passwordValue,
    });

    navigation.navigate("Home");
  };

  const handleForgotPassword = () => {
    if (!inputValue.trim()) {
      setAlertMessage("Please enter your email or phone number.");
      setShowAlert(true);
      return;
    }

    if (!emailRegex.test(inputValue) && !phoneRegex.test(inputValue)) {
      setAlertMessage("Please enter a valid email or phone number.");
      setShowAlert(true);
      return;
    }

    // Handle forgot password logic
    console.log("Password reset for:", inputValue);
  };

  return (
    <SafeAreaView style={styles3.container}>
      <StatusBar style="dark" />
      <GeneralNavbar
        onPressFun1={() => navigation.goBack()}
        titleText={step === "signIn" ? "Sign In" : "Forgot Password"}
      />
      <View style={styles3.headerContainer}>
        <Text style={styles3.headerText}>
          {step === "signIn" ? "Sign In" : "Forgot Password"}
        </Text>
      </View>
      <View style={styles3.inputContainer}>
        <TextInput
          style={styles3.textInput}
          placeholder="Email or Phone"
          cursorColor={"#ff4040"}
          keyboardType="email-address"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        {step === "signIn" && (
          <View style={styles3.passwordInputContainer}>
            <TextInput
              style={styles3.textInput}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              cursorColor={"#ff4040"}
              placeholderTextColor="#888"
              autoCapitalize="none"
              value={passwordValue}
              onChangeText={(text) => setPasswordValue(text)}
            />
            <TouchableOpacity
              style={styles3.eyeIcon}
              onPress={togglePasswordVisibility}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {step === "signIn" ? (
        <>
          <TouchableOpacity style={styles3.signUpButton} onPress={handleSignIn}>
            <Text style={styles3.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles3.forgotButton}
            onPress={() => setStep("forgotPassword")}
          >
            <Text style={styles3.forgotButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles3.signUpButton}
            onPress={handleForgotPassword}
          >
            <Text style={styles3.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles3.backToSignInButton}
            onPress={() => setStep("signIn")}
          >
            <Text style={styles3.backToSignInText}>Back to Sign In</Text>
          </TouchableOpacity>
        </>
      )}

      <AlertMessage
        heading="Error"
        message={alertMessage}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        triggerFunction={() => setShowAlert(false)}
        isRight={false}
      />
    </SafeAreaView>
  );
};

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto-Medium",
  },
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  textInput: {
    height: 50,
    borderColor: "#CECECE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#E8E8E8",
    marginBottom: 15,
    fontFamily: "Roboto-Medium",
  },
  passwordInputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Roboto-Medium",
  },
  forgotButton: {
    alignItems: "center",
    marginTop: 15,
  },
  forgotButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontFamily: "Roboto-Medium",
  },
  backToSignInButton: {
    alignItems: "center",
    marginTop: 15,
  },
  backToSignInText: {
    color: "#007AFF",
    fontSize: 14,
    fontFamily: "Roboto-Medium",
  },
});

const AuthScreen = () => {
  const navigation = useNavigation();
  const fontsLoaded = Font();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../assets/appImages/HomeImage.jpg")}
      style={styles4.background}
      resizeMode="cover"
    >
      <StatusBar style="inverted" />

      <View style={styles4.overlay}>
        <View>
          <Image
            source={require("../../assets/appImages/icon/icon.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              resizeMode: "contain",
            }}
          />
        </View>
        <TouchableOpacity
          style={[styles4.loginButton, styles4.firstButton]}
          onPress={() => navigation.navigate("SigninScreen")}
        >
          <Image
            source={require("../../assets/appImages/icon/iphone.png")}
            style={{
              width: 25,
              height: 25,
              flex: 1 / 6,
              tintColor: "#fff",
              resizeMode: "contain",
            }}
          />
          <Text style={styles4.loginButtonText}>Sign In with Phone Number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles4.loginButton, styles4.secondButton]}>
          <Image
            source={require("../../assets/appImages/icon/google.png")}
            style={{
              width: 25,
              height: 25,
              flex: 1 / 6,
              resizeMode: "contain",
            }}
          />
          <Text
            style={[
              fontRoboto.fontRoboto,
              styles4.loginButtonText,
              { color: "#000" },
            ]}
          >
            Sign In with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles4.loginButton, styles4.thirdButton]}>
          <Image
            source={require("../../assets/appImages/icon/facebook.png")}
            style={{
              width: 25,
              height: 25,
              tintColor: "#fff",
              flex: 1 / 6,
              resizeMode: "contain",
            }}
          />
          <Text style={styles4.loginButtonText}>Sign In with Facebook</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ color: "#fff", padding: 10 }}>or</Text>
        </View>
        <TouchableOpacity
          style={styles4.signupButton}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles4.signupButtonText}>
            Don't have an account?{" "}
            <Text
              style={{ fontWeight: "bold", fontSize: 14, color: "#ff4757" }}
            >
              SignUp
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles4.termsContaner}>
          <Text style={styles4.termsHeadingText}>
            By signing up you agreed with our
          </Text>
          <TouchableOpacity>
            <Text style={styles4.termsLinkText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles4 = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  container: {
    alignItems: "center",
    width: "80%",
  },
  termsContaner: {
    padding: 50,
    alignItems: "center",
  },
  termsHeadingText: {
    color: "#fff",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginBottom: 5,
  },
  loginButton: {
    padding: 15,
    width: "85%",
    height: "6.5%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ff4757",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 14,
    flex: 3 / 4,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  signupButton: {
    padding: 15,
    width: "85%",
    height: "6.2%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: "10%",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  signupButtonText: {
    color: "#000",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  thirdButton: {
    backgroundColor: "#1877F2",
  },
  firstButton: {
    backgroundColor: "#000",
  },
  secondButton: {
    color: "#000",
    backgroundColor: "#fff",
  },
  termsLinkText: {
    color: "#71b9f0",
    fontFamily: "Roboto-Light",
  },
});
export { SignInScreen, CreateAccountScreen, AuthScreen };
