import {
  GPSService,
} from "@/mobile/gps/GPSService";

import {
  CameraAIService,
} from "@/mobile/camera/CameraAIService";

export const FieldOperationsService = {

  async inspectField() {

    const location =
      await GPSService.getCurrentPosition();

    const analysis =
      await CameraAIService.analyzeImage(
        "field-image.jpg"
      );

    return {

      location,

      analysis,
    };
  },
};
