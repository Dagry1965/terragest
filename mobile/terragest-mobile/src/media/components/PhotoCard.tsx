import {
  Image,
  Text,
  View,
} from "react-native";

interface PhotoCardProps {

  uri: string;

  title?: string;
}

export const PhotoCard = ({
  uri,
  title,
}: PhotoCardProps) => {

  return (

    <View
      style={{
        backgroundColor:
          "white",

        borderRadius: 16,

        padding: 12,

        marginBottom: 16,
      }}
    >

      <Image
        source={{
          uri,
        }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 12,
        }}
      />

      {title && (

        <Text
          style={{
            marginTop: 12,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>

      )}

    </View>
  );
}
