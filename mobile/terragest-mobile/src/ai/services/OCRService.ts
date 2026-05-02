import TesseractOcr from "react-native-tesseract-ocr";

export const OCRService = {

  async extractText(
    imagePath: string
  ) {

    try {

      const text =
        await TesseractOcr.recognize(
          imagePath,
          "fra",
          {
            whitelist:
              null,
            blacklist:
              null,
          }
        );

      return text;

    } catch (err) {

      console.error(err);

      throw err;
    }
  },
};
