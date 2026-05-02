Write-Host "Generating Terragest Mobile GIS & GPS..." -ForegroundColor Cyan

# =====================================================
# GO TO MOBILE APP
# =====================================================

Set-Location "mobile\terragest-mobile"

# =====================================================
# INSTALL MAPS + LOCATION
# =====================================================

npx expo install expo-location

npx expo install react-native-maps

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\maps" -Force
mkdir "src\maps\components" -Force
mkdir "src\maps\services" -Force
mkdir "src\screens\maps" -Force

# =====================================================
# LOCATION SERVICE
# =====================================================

$locationService = @'
import * as Location from "expo-location";

export const LocationService = {

  async requestPermission() {

    const {
      status,
    } =
      await Location.requestForegroundPermissionsAsync();

    return status === "granted";
  },

  async getCurrentPosition() {

    const hasPermission =
      await this.requestPermission();

    if (!hasPermission) {

      throw new Error(
        "Permission GPS refusée"
      );
    }

    const location =
      await Location.getCurrentPositionAsync(
        {}
      );

    return {

      latitude:
        location.coords.latitude,

      longitude:
        location.coords.longitude,
    };
  },
};
'@

Set-Content `
"src\maps\services\LocationService.ts" `
$locationService

# =====================================================
# MAP VIEW COMPONENT
# =====================================================

$mapView = @'
import MapView, {
  Marker,
} from "react-native-maps";

interface TerrainMapProps {

  latitude: number;

  longitude: number;

  title?: string;
}

export const TerrainMap = ({
  latitude,
  longitude,
  title,
}: TerrainMapProps) => {

  return (

    <MapView
      style={{
        flex: 1,
      }}
      initialRegion={{
        latitude,
        longitude,

        latitudeDelta:
          0.01,

        longitudeDelta:
          0.01,
      }}
    >

      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        title={title}
      />

    </MapView>
  );
}
'@

Set-Content `
"src\maps\components\TerrainMap.tsx" `
$mapView

# =====================================================
# GPS BADGE
# =====================================================

$gpsBadge = @'
interface GpsBadgeProps {

  latitude: number;

  longitude: number;
}

export const GpsBadge = ({
  latitude,
  longitude,
}: GpsBadgeProps) => {

  return (

    <div
      style={{
        backgroundColor:
          "#16a34a",

        padding: 12,

        borderRadius: 12,
      }}
    >

      <p
        style={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        GPS :
        {latitude.toFixed(5)}
        ,
        {longitude.toFixed(5)}
      </p>

    </div>
  );
}
'@

Set-Content `
"src\maps\components\GpsBadge.tsx" `
$gpsBadge

# =====================================================
# MAP SCREEN
# =====================================================

$mapScreen = @'
import {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  View,
} from "react-native";

import { TerrainMap } from "@/maps/components/TerrainMap";

import { LocationService } from "@/maps/services/LocationService";

export default function MapScreen() {

  const [position,
    setPosition] =
    useState<any>(null);

  useEffect(() => {

    loadPosition();

  }, []);

  const loadPosition =
    async () => {

      try {

        const coords =
          await LocationService.getCurrentPosition();

        setPosition(
          coords
        );

      } catch (err) {

        console.error(err);

        Alert.alert(
          "Erreur GPS"
        );
      }
    };

  if (!position) {

    return (
      <View />
    );
  }

  return (

    <View
      style={{
        flex: 1,
      }}
    >

      <TerrainMap
        latitude={
          position.latitude
        }
        longitude={
          position.longitude
        }
        title="Position terrain"
      />

    </View>
  );
}
'@

Set-Content `
"src\screens\maps\MapScreen.tsx" `
$mapScreen

# =====================================================
# UPDATE APP TSX
# =====================================================

$appTsx = @'
import MapScreen from "./src/screens/maps/MapScreen";

export default function App() {

  return <MapScreen />;
}
'@

Set-Content `
"App.tsx" `
$appTsx

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Mobile GIS generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- GPS service"
Write-Host "- Mobile maps"
Write-Host "- Terrain mapping"
Write-Host "- GIS foundation"
Write-Host "- Geolocation ERP"
Write-Host ""