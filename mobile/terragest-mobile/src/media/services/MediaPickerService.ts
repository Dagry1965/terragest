import * as ImagePicker from "expo-image-picker";

export const MediaPickerService = {

  async pickImage() {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      permission.status !==
      "granted"
    ) {

      throw new Error(
        "Permission galerie refusée"
      );
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 0.8,

        allowsEditing: true,
      });

    if (result.canceled) {
      return null;
    }

    return result.assets[0];
  },

  async takePhoto() {

    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (
      permission.status !==
      "granted"
    ) {

      throw new Error(
        "Permission caméra refusée"
      );
    }

    const result =
      await ImagePicker.launchCameraAsync({

        quality: 0.8,

        allowsEditing: true,
      });

    if (result.canceled) {
      return null;
    }

    return result.assets[0];
  },
};
