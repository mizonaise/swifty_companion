import { useState, createContext, useEffect } from "react";

import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { checkExpired } from "@/utils/date";

export function AuthProvider(Props) {
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.post("https://api.intra.42.fr/oauth/token/", {
          client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
          client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
          grant_type: "client_credentials",
        });

        if (res.data) {
          setToken(res.data.access_token);
          await SecureStore.setItemAsync("user", JSON.stringify(res.data));
        }
      } catch (error) {
        console.log("token error", error);
        return null;
      }
    };
    const handleToken = async () => {
      const userData = await SecureStore.getItemAsync("user");
      if (!token) {
        if (userData) {
          const {
            expires_in: expire,
            created_at: created,
            access_token: token,
          } = JSON.parse(userData);
          if (checkExpired(created + expire)) {
            await getToken();
          } else {
            setToken(token);
          }
        } else {
          await getToken();
        }
      }
    };
    handleToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setCode }}>
      {Props.children}
    </AuthContext.Provider>
  );
}

export const AuthContext = createContext();
