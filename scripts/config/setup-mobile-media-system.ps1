Write-Host "Generating Terragest Mobile Media System..." -ForegroundColor Cyan

# =====================================================
# GO TO MOBILE APP
# =====================================================

Set-Location "mobile\terragest-mobile"

# =====================================================
# INSTALL MEDIA PACKAGES
# =====================================================

npx expo install expo-image-picker

npx expo install expo-file-system

npx expo install firebase

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\media" -Force
mkdir "src\media\services" -Force
mkdir "src\media\components" -Force
mkdir "src\screens\media" -Force

# =====================================================
# MEDIA PICKER SERVICE
# =====================================================

$mediaPicker = @'
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
'@

Set-Content `
"src\media\services\MediaPickerService.ts" `
$mediaPicker

# =====================================================
# FIREBASE STORAGE SERVICE
# =====================================================

$storageService = @'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { app } from "@/services/firebase";

const storage =
  getStorage(app);

export const StorageService = {

  async uploadImage(
    uri: string,
    path: string
  ) {

    const response =
      await fetch(uri);

    const blob =
      await response.blob();

    const storageRef =
      ref(
        storage,
        path
      );

    await uploadBytes(
      storageRef,
      blob
    );

    return getDownloadURL(
      storageRef
    );
  },
};
'@

Set-Content `
"src\media\services\StorageService.ts" `
$storageService

# =====================================================
# PHOTO CARD
# =====================================================

$photoCard = @'
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
'@

Set-Content `
"src\media\components\PhotoCard.tsx" `
$photoCard

# =====================================================
# MEDIA SCREEN
# =====================================================

$mediaScreen = @'
import {
  useState,
} from "react";

import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MediaPickerService } from "@/media/services/MediaPickerService";

import { StorageService } from "@/media/services/StorageService";

import { PhotoCard } from "@/media/components/PhotoCard";

export default function MediaScreen() {

  const [photos,
    setPhotos] =
    useState<any[]>([]);

  const handleGallery =
    async () => {

      try {

        const image =
          await MediaPickerService.pickImage();

        if (!image) {
          return;
        }

        const url =
          await StorageService.uploadImage(
            image.uri,
            `photos/${Date.now()}.jpg`
          );

        setPhotos((prev) => [
          ...prev,
          {
            uri: url,
          },
        ]);

      } catch (err) {

        console.error(err);

        Alert.alert(
          "Erreur upload"
        );
      }
    };

  const handleCamera =
    async () => {

      try {

        const image =
          await MediaPickerService.takePhoto();

        if (!image) {
          return;
        }

        const url =
          await StorageService.uploadImage(
            image.uri,
            `photos/${Date.now()}.jpg`
          );

        setPhotos((prev) => [
          ...prev,
          {
            uri: url,
          },
        ]);

      } catch (err) {

        console.error(err);

        Alert.alert(
          "Erreur caméra"
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
        Photos terrain
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginBottom: 20,
        }}
      >

        <TouchableOpacity
          onPress={handleGallery}
          style={{
            backgroundColor:
              "#2563eb",

            padding: 16,

            borderRadius: 12,
          }}
        >

          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Galerie
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCamera}
          style={{
            backgroundColor:
              "#16a34a",

            padding: 16,

            borderRadius: 12,
          }}
        >

          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Caméra
          </Text>

        </TouchableOpacity>

      </View>

      {photos.map(
        (
          photo,
          index
        ) => (

          <PhotoCard
            key={index}
            uri={photo.uri}
            title={`Photo ${index + 1}`}
          />

        )
      )}

    </ScrollView>
  );
}
'@

Set-Content `
"src\screens\media\MediaScreen.tsx" `
$mediaScreen

# =====================================================
# UPDATE APP TSX
# =====================================================

$appTsx = @'
import MediaScreen from "./src/screens/media/MediaScreen";

export default function App() {

  return <MediaScreen />;
}
'@

Set-Content `
"App.tsx" `
$appTsx

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Mobile Media System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Camera capture"
Write-Host "- Gallery upload"
Write-Host "- Firebase storage"
Write-Host "- Photo gallery"
Write-Host "- Field operations media foundation"
Write-Host ""