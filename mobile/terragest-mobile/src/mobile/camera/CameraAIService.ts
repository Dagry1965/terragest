export const CameraAIService = {

  async analyzeImage(
    imageUri: string
  ) {

    console.log(
      "Analyzing image:",
      imageUri
    );

    return {

      diseaseRisk:
        "LOW",

      recommendation:
        "Aucune anomalie détectée",
    };
  },
};
