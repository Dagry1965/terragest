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
