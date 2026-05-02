Write-Host "Generating Terragest Mobile QR Scanner..." -ForegroundColor Cyan

# =====================================================
# GO TO MOBILE APP
# =====================================================

Set-Location "mobile\terragest-mobile"

# =====================================================
# INSTALL QR SCANNER
# =====================================================

npx expo install expo-camera

npx expo install expo-barcode-scanner

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\screens\scanner" -Force
mkdir "src\components\scanner" -Force
mkdir "src\services\scanner" -Force

# =====================================================
# QR SCANNER COMPONENT
# =====================================================

$qrScanner = @'
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
'@

Set-Content `
"src\components\scanner\QrScanner.tsx" `
$qrScanner

# =====================================================
# PRODUCT LOOKUP SERVICE
# =====================================================

$productLookup = @'
import { apiClient } from "@/services/apiClient";

export const ProductLookupService = {

  async findByCode(
    code: string,
    organisationId: string
  ) {

    const response =
      await apiClient.get(
        `/produits?organisationId=${organisationId}`
      );

    const produits =
      response.data || [];

    return produits.find(
      (item: any) =>
        item.codeBarre === code
    );
  },
};
'@

Set-Content `
"src\services\scanner\ProductLookupService.ts" `
$productLookup

# =====================================================
# SCANNER SCREEN
# =====================================================

$scannerScreen = @'
import {
  Alert,
  View,
} from "react-native";

import { QrScanner } from "@/components/scanner/QrScanner";

import { ProductLookupService } from "@/services/scanner/ProductLookupService";

export default function ScannerScreen() {

  const handleScan =
    async (
      code: string
    ) => {

      try {

        const produit =
          await ProductLookupService.findByCode(
            code,
            "ORG_ID"
          );

        if (!produit) {

          Alert.alert(
            "Produit introuvable"
          );

          return;
        }

        Alert.alert(
          "Produit trouvé",
          produit.nom
        );

      } catch (err) {

        console.error(err);

        Alert.alert(
          "Erreur scan"
        );
      }
    };

  return (

    <View
      style={{
        flex: 1,
      }}
    >

      <QrScanner
        onScan={handleScan}
      />

    </View>
  );
}
'@

Set-Content `
"src\screens\scanner\ScannerScreen.tsx" `
$scannerScreen

# =====================================================
# UPDATE APP TSX
# =====================================================

$appTsx = @'
import ScannerScreen from "./src/screens/scanner/ScannerScreen";

export default function App() {

  return <ScannerScreen />;
}
'@

Set-Content `
"App.tsx" `
$appTsx

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Mobile QR Scanner generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- QR scanner"
Write-Host "- Barcode scanner"
Write-Host "- Product lookup"
Write-Host "- Mobile scan workflow"
Write-Host "- Smart inventory foundation"
Write-Host ""