export const ImageAnalysisService = {

  async analyzeImage(
    imageUrl: string
  ) {

    return {

      status:
        "ANALYZED",

      confidence:
        0.94,

      tags: [
        "terrain",
        "culture",
        "vegetation",
      ],

      recommendations: [

        "Vérifier humidité",

        "Contrôle sanitaire recommandé",

        "Surveillance culture",
      ],
    };
  },
};
