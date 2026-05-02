import {
  Text,
  View,
} from "react-native";

interface ChatBubbleProps {

  message: string;

  isUser?: boolean;
}

export const ChatBubble = ({
  message,
  isUser,
}: ChatBubbleProps) => {

  return (

    <View
      style={{
        alignSelf:
          isUser
            ? "flex-end"
            : "flex-start",

        backgroundColor:
          isUser
            ? "#2563eb"
            : "#e5e7eb",

        padding: 14,

        borderRadius: 16,

        marginBottom: 12,

        maxWidth: "85%",
      }}
    >

      <Text
        style={{
          color:
            isUser
              ? "white"
              : "black",
        }}
      >
        {message}
      </Text>

    </View>
  );
}
