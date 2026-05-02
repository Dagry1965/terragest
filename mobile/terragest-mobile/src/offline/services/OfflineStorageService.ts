import AsyncStorage from "@react-native-async-storage/async-storage";

export const OfflineStorageService = {

  async setItem(
    key: string,
    value: any
  ) {

    await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
  },

  async getItem(
    key: string
  ) {

    const value =
      await AsyncStorage.getItem(
        key
      );

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  },

  async removeItem(
    key: string
  ) {

    await AsyncStorage.removeItem(
      key
    );
  },
};
