import AsyncStorage
from "@react-native-async-storage/async-storage";

export const OfflineCacheService = {

  async set(
    key: string,
    value: any
  ) {

    await AsyncStorage.setItem(

      key,

      JSON.stringify(
        value
      )
    );
  },

  async get(
    key: string
  ) {

    const value =
      await AsyncStorage.getItem(
        key
      );

    return value
      ? JSON.parse(value)
      : null;
  },
};
