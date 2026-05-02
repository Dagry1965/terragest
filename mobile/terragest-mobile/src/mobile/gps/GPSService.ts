import * as Location
from "expo-location";

export const GPSService = {

  async getCurrentPosition() {

    const {
      status,
    } =
      await Location.requestForegroundPermissionsAsync();

    if (
      status !== "granted"
    ) {

      throw new Error(
        "GPS permission denied"
      );
    }

    return Location.getCurrentPositionAsync(
      {}
    );
  },
};
