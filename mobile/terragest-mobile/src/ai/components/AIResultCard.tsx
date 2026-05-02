import {
  Text,
  View,
} from "react-native";

interface AIResultCardProps {

  analysis: any;
}

export const AIResultCard = ({
  analysis,
}: AIResultCardProps) => {

  if (!analysis) {
    return null;
  }

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
        Analyse IA
      </Text>

      <Text>
        Confiance :
        {Math.round(
          analysis.confidence * 100
        )}%
      </Text>

      <Text
        style={{
          marginTop: 12,
          fontWeight: "bold",
        }}
      >
        Tags
      </Text>

      {analysis.tags?.map(
        (
          tag: string,
          index: number
        ) => (

          <Text key={index}>
            • {tag}
          </Text>

        )
      )}

      <Text
        style={{
          marginTop: 12,
          fontWeight: "bold",
        }}
      >
        Recommandations
      </Text>

      {analysis.recommendations?.map(
        (
          item: string,
          index: number
        ) => (

          <Text key={index}>
            • {item}
          </Text>

        )
      )}

    </View>
  );
}
