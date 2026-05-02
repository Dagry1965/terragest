import {
  useState,
} from "react";

import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import { MediaPickerService } from "@/media/services/MediaPickerService";

import { OCRService } from "@/ai/services/OCRService";

import { ImageAnalysisService } from "@/ai/services/ImageAnalysisService";

import { AIResultCard } from "@/ai/components/AIResultCard";

export default function AIScreen() {

  const [ocrText,
    setOcrText] =
    useState("");

  const [analysis,
    setAnalysis] =
    useState<any>(null);

  const handleAnalyze =
    async () => {

      try {

        const image =
          await MediaPickerService.pickImage();

        if (!image) {
          return;
        }

        const extractedText =
          await OCRService.extractText(
            image.uri
          );

        setOcrText(
          extractedText
        );

        const result =
          await ImageAnalysisService.analyzeImage(
            image.uri
          );

        setAnalysis(
          result
        );

      } catch (err) {

        console.error(err);

        Alert.alert(
          "Erreur IA"
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
        AI Terrain Assistant
      </Text>

      <TouchableOpacity
        onPress={handleAnalyze}
        style={{
          backgroundColor:
            "#7c3aed",

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
          Analyser image
        </Text>

      </TouchableOpacity>

      {ocrText && (

        <>
          <Text
            style={{
              marginTop: 20,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            OCR
          </Text>

          <Text
            style={{
              marginTop: 12,
            }}
          >
            {ocrText}
          </Text>
        </>

      )}

      <AIResultCard
        analysis={analysis}
      />

    </ScrollView>
  );
}
