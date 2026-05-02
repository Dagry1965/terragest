import * as Notifications from "expo-notifications";

import * as Device from "expo-device";

import Constants from "expo-constants";

export const NotificationService = {

  async registerForPushNotifications() {

    if (!Device.isDevice) {

      throw new Error(
        "Notifications uniquement sur appareil réel"
      );
    }

    const {
      status: existingStatus,
    } =
      await Notifications.getPermissionsAsync();

    let finalStatus =
      existingStatus;

    if (
      existingStatus !==
      "granted"
    ) {

      const {
        status,
      } =
        await Notifications.requestPermissionsAsync();

      finalStatus =
        status;
    }

    if (
      finalStatus !==
      "granted"
    ) {

      throw new Error(
        "Permission notification refusée"
      );
    }

    const token =
      await Notifications.getExpoPushTokenAsync({

        projectId:
          Constants.expoConfig?.extra?.eas?.projectId,
      });

    return token.data;
  },

  async sendLocalNotification(
    title: string,
    body: string
  ) {

    await Notifications.scheduleNotificationAsync({

      content: {
        title,
        body,
      },

      trigger: null,
    });
  },
};
