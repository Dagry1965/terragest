import React,
{
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  FieldOperationsService,
} from "@/mobile/services/FieldOperationsService";

export default function FieldOperationsScreen() {

  const [result,
    setResult] =
    useState<any>(null);

  const handleInspection =
    async () => {

      const response =
        await FieldOperationsService.inspectField();

      setResult(
        response
      );
    };

  return (

    <ScrollView
      contentContainerStyle={{

        padding: 24,
      }}
    >

      <Text
        style={{

          fontSize: 32,

          fontWeight: "bold",

          marginBottom: 24,
        }}
      >

        Mobile Field Operations

      </Text>

      <TouchableOpacity
        onPress={handleInspection}
        style={{

          backgroundColor: "black",

          padding: 16,

          borderRadius: 16,
        }}
      >

        <Text
          style={{

            color: "white",

            textAlign: "center",

            fontWeight: "bold",
          }}
        >

          Start Inspection

        </Text>

      </TouchableOpacity>

      {result && (

        <View
          style={{

            marginTop: 32,

            backgroundColor: "white",

            padding: 24,

            borderRadius: 16,
          }}
        >

          <Text>

            GPS synchronized

          </Text>

          <Text>

            AI analysis completed

          </Text>

        </View>

      )}

    </ScrollView>
  );
}
