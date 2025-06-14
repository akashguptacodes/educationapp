import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { UserDetailContext } from '../context/UserDetailContext';
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  const [userDetail, setUserDetail] = useState(null);

  // Ensure fonts are loaded before rendering the app
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack screenOptions={{ headerShown: false }} />
    </UserDetailContext.Provider>
  );
}
