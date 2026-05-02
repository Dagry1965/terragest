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
