import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 90 }}>
        <Image
          style={{
            width: 220,
            height: 440,
            borderRadius: 20,
            borderWidth: 8,
            borderColor: "#000",
          }}
          source={require("../assets/images/display.jpg")}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 29,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
           Food Inventory Application{" "}
          </Text>{" "}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
            textAlign: "center",
            fontSize: 15,
            marginVertical: 15,
          }}
        >
          List of all your food Items and their availability at your fingerTips
        </Text>

        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "outfit",
            }}
          >
            Let's get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "white",
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 99,
    marginTop: 20,
  },
});
