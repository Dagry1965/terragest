import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import {
  useState,
} from "react";

import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";

interface QrScannerProps {

  onScan: (
    value: string
  ) => void;
}

export const QrScanner = ({
  onScan,
}: QrScannerProps) => {

  const [permission,
    requestPermission] =
    useCameraPermissions();

  const [scanned,
    setScanned] =
    useState(false);

  if (!permission) {

    return (
      <View />
    );
  }

  if (!permission.granted) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >

        <TouchableOpacity
          onPress={
            requestPermission
          }
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
            Autoriser caméra
          </Text>

        </TouchableOpacity>

      </View>
    );
  }

  return (

    <View
      style={{
        flex: 1,
      }}
    >

      <CameraView
        style={{
          flex: 1,
        }}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "code128",
          ],
        }}
        onBarcodeScanned={
          scanned

            ? undefined

            : (result) => {

                setScanned(
                  true
                );

                onScan(
                  result.data
                );
              }
        }
      />

      {scanned && (

        <TouchableOpacity
          onPress={() =>
            setScanned(false)
          }
          style={{
            position:
              "absolute",

            bottom: 40,

            alignSelf:
              "center",

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
            Scanner à nouveau
          </Text>

        </TouchableOpacity>

      )}

    </View>
  );
}
