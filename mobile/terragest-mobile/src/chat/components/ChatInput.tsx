import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

interface ChatInputProps {

  value: string;

  onChange: (
    value: string
  ) => void;

  onSend: () => void;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
}: ChatInputProps) => {

  return (

    <View
      style={{
        flexDirection: "row",
        gap: 10,
        marginTop: 12,
      }}
    >

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Poser une question..."
        style={{
          flex: 1,
          backgroundColor:
            "white",

          padding: 14,

          borderRadius: 14,
        }}
      />

      <TouchableOpacity
        onPress={onSend}
        style={{
          backgroundColor:
            "#7c3aed",

          paddingHorizontal: 20,

          justifyContent:
            "center",

          borderRadius: 14,
        }}
      >

        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Envoyer
        </Text>

      </TouchableOpacity>

    </View>
  );
}
