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
