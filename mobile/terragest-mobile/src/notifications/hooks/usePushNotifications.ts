import {
  useEffect,
  useState,
} from "react";

import { NotificationService } from "@/notifications/services/NotificationService";

export const usePushNotifications =
  () => {

    const [token,
      setToken] =
      useState("");

    useEffect(() => {

      register();

    }, []);

    const register =
      async () => {

        try {

          const pushToken =
            await NotificationService.registerForPushNotifications();

          setToken(
            pushToken
          );

        } catch (err) {

          console.error(err);
        }
      };

    return {
      token,
    };
  };
