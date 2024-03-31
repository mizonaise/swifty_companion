import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet } from "react-native";

import Logo from "@/assets/icons/42";
import * as WebBrowser from "expo-web-browser";
import { Button, LinearGradient, Text, View } from "@/components/Themed";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function WelcomScreen() {
  const { setCode } = useContext(AuthContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET as string,

      redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URL as string,
      scopes: ["public"],
    },
    {
      authorizationEndpoint: "https://api.intra.42.fr/oauth/authorize",
      tokenEndpoint: "https://api.intra.42.fr/oauth/token",
    }
  );

  const onPressLogin = async () => {
    try {
      let res = await promptAsync();
      if (res?.type === "success") {
        setCode(res.params.code);
        router.replace("/search");
      }
      // else ToastAndroid.show("AUTHENTICATION FAILED", ToastAndroid.SHORT);
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={["rgba(0,0,0,0.8)", "transparent"]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../assets/images/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/images/hero3.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -30,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/images/hero3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 130,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/images/hero2.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 110,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.lets}>Let's Get</Text>
          <Text style={styles.started}>Started</Text>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                marginVertical: 4,
              }}
            >
              Connect and Search for peers
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Calling, Enjoy Safe and private Searching
            </Text>
            <Button
              style={{
                width: "100%",
                padding: 8,
                marginTop: 22,
                borderRadius: 10,
                // display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.9)"
              // onPress={() => router.replace("/search")}
              onPress={onPressLogin}
            >
              {/* <Image source={require("../assets/icons/42.svg")} /> */}
              <Logo />
              <Text
                style={{ fontSize: 18, fontWeight: "800" }}
                darkColor="black"
                lightColor="white"
              >
                Continue with Intra
              </Text>
            </Button>
          </View>
        </View>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bottom: {
    top: 400,
    width: "100%",
    position: "absolute",
    paddingHorizontal: 22,
  },
  lets: {
    fontSize: 50,
    fontWeight: "800",
  },
  started: {
    fontSize: 46,
    fontWeight: "800",
  },
});
