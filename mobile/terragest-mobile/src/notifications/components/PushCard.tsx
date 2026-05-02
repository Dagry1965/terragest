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
