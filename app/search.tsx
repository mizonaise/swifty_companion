import { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Button, Input, Text, View } from "@/components/Themed";
import axios from "axios";
import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { IUserRes } from "@/types/userData";

export default function SearchScreen() {
  const { token } = useContext(AuthContext);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (input: string) => {
    setText(input);
  };

  const getUserData = async (login: string) => {
    setLoading(true);
    await axios
      .get(`https://api.intra.42.fr/v2/users/${login}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        let user = {
          link: res.data?.image?.link,
          username: res.data.displayname,
          email: res.data.email,
          login: res.data.login,
          wallet: res.data.wallet,
          phone: res.data.phone,
          correctionPoint: res.data.correction_point,
          campus: `${res.data.campus[0].city}, ${res.data.campus[0].country}`,
          cursus: JSON.stringify(res.data.cursus_users),
          userProjects: JSON.stringify(res.data.projects_users),
        };
        await router.push({ pathname: "/details", params: user });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const onPressSearch = () => {
    if (token) {
      getUserData(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 12,
            textTransform: "capitalize",
          }}
        >
          Welcom Back again ! 👋
        </Text>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginVertical: 8,
            }}
          >
            Search
          </Text>

          <Input
            placeholder="Enter your email address"
            style={{
              height: 48,
              width: "100%",
              borderRadius: 8,
              paddingHorizontal: 22,
            }}
            onChangeText={handleInputChange}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.7)"
          />
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
            onPress={onPressSearch}
            disabled={loading}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "800" }}
              darkColor="black"
              lightColor="white"
            >
              Search
            </Text>
          </Button>
        </View>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
