Write-Host "Generating Terragest Mobile Push Notifications..." -ForegroundColor Cyan

# =====================================================
# GO TO MOBILE APP
# =====================================================

Set-Location "mobile\terragest-mobile"

# =====================================================
# INSTALL NOTIFICATIONS
# =====================================================

npx expo install expo-notifications

npx expo install expo-device

npx expo install expo-constants

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\notifications" -Force
mkdir "src\notifications\services" -Force
mkdir "src\notifications\hooks" -Force
mkdir "src\notifications\components" -Force

# =====================================================
# NOTIFICATION SERVICE
# =====================================================

$notificationService = @'
import * as Notifications from "expo-notifications";

import * as Device from "expo-device";

import Constants from "expo-constants";

export const NotificationService = {

  async registerForPushNotifications() {

    if (!Device.isDevice) {

      throw new Error(
        "Notifications uniquement sur appareil réel"
      );
    }

    const {
      status: existingStatus,
    } =
      await Notifications.getPermissionsAsync();

    let finalStatus =
      existingStatus;

    if (
      existingStatus !==
      "granted"
    ) {

      const {
        status,
      } =
        await Notifications.requestPermissionsAsync();

      finalStatus =
        status;
    }

    if (
      finalStatus !==
      "granted"
    ) {

      throw new Error(
        "Permission notification refusée"
      );
    }

    const token =
      await Notifications.getExpoPushTokenAsync({

        projectId:
          Constants.expoConfig?.extra?.eas?.projectId,
      });

    return token.data;
  },

  async sendLocalNotification(
    title: string,
    body: string
  ) {

    await Notifications.scheduleNotificationAsync({

      content: {
        title,
        body,
      },

      trigger: null,
    });
  },
};
'@

Set-Content `
"src\notifications\services\NotificationService.ts" `
$notificationService

# =====================================================
# PUSH HOOK
# =====================================================

$pushHook = @'
import {
  useEffect,
  useState,
} from "react";

import { NotificationService } from "@/notifications/services/NotificationService";

export const usePushNotifications =
  () => {

    const [token,
      setToken] =
      useState("");

    useEffect(() => {

      register();

    }, []);

    const register =
      async () => {

        try {

          const pushToken =
            await NotificationService.registerForPushNotifications();

          setToken(
            pushToken
          );

        } catch (err) {

          console.error(err);
        }
      };

    return {
      token,
    };
  };
'@

Set-Content `
"src\notifications\hooks\usePushNotifications.ts" `
$pushHook

# =====================================================
# PUSH CARD
# =====================================================

$pushCard = @'
import {
  Text,
  View,
} from "react-native";

interface PushCardProps {

  token: string;
}

export const PushCard = ({
  token,
}: PushCardProps) => {

  return (

    <View
      style={{
        backgroundColor:
          "white",

        padding: 20,

        borderRadius: 16,

        marginTop: 20,
      }}
    >

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Push Notifications
      </Text>

      <Text>
        Token :
      </Text>

      <Text
        style={{
          marginTop: 10,
          color: "#2563eb",
        }}
      >
        {token || "Chargement..."}
      </Text>

    </View>
  );
}
'@

Set-Content `
"src\notifications\components\PushCard.tsx" `
$pushCard

# =====================================================
# NOTIFICATION SCREEN
# =====================================================

$notificationScreen = @'
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import { NotificationService } from "@/notifications/services/NotificationService";

import { usePushNotifications } from "@/notifications/hooks/usePushNotifications";

import { PushCard } from "@/notifications/components/PushCard";

export default function NotificationScreen() {

  const { token } =
    usePushNotifications();

  const handleTest =
    async () => {

      try {

        await NotificationService.sendLocalNotification(

          "Terragest ERP",

          "Stock faible détecté"
        );

      } catch (err) {

        console.error(err);

        Alert.alert(
          "Erreur notification"
        );
      }
    };

  return (

    <ScrollView
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Notifications ERP
      </Text>

      <TouchableOpacity
        onPress={handleTest}
        style={{
          backgroundColor:
            "#dc2626",

          padding: 18,

          borderRadius: 14,
        }}
      >

        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Tester notification
        </Text>

      </TouchableOpacity>

      <PushCard token={token} />

    </ScrollView>
  );
}
'@

Set-Content `
"src\screens\NotificationScreen.tsx" `
$notificationScreen

# =====================================================
# UPDATE APP TSX
# =====================================================

$appTsx = @'
import NotificationScreen from "./src/screens/NotificationScreen";

export default function App() {

  return <NotificationScreen />;
}
'@

Set-Content `
"App.tsx" `
$appTsx

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Push Notification System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Push notifications"
Write-Host "- Device registration"
Write-Host "- ERP mobile alerts"
Write-Host "- Real-time notifications"
Write-Host "- Mobile realtime operations foundation"
Write-Host ""