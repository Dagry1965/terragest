import {
  useEffect,
  useState,
} from "react";

import {
  FlatList,
  Text,
  View,
} from "react-native";

import { apiClient } from "@/services/apiClient";

export default function ProductsScreen() {

  const [produits,
    setProduits] =
    useState<any[]>([]);

  useEffect(() => {

    loadProduits();

  }, []);

  const loadProduits =
    async () => {

      try {

        const response =
          await apiClient.get(
            "/produits?organisationId=ORG_ID"
          );

        setProduits(
          response.data || []
        );

      } catch (err) {

        console.error(err);
      }
    };

  return (

    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Produits
      </Text>

      <FlatList
        data={produits}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (

          <View
            style={{
              backgroundColor:
                "white",

              padding: 16,

              borderRadius: 16,

              marginBottom: 12,
            }}
          >

            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.nom}
            </Text>

            <Text>
              {item.categorie}
            </Text>

          </View>

        )}
      />

    </View>
  );
}
