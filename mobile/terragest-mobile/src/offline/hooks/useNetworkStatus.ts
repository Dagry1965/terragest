import {
  useEffect,
  useState,
} from "react";

import * as Network from "expo-network";

export const useNetworkStatus =
  () => {

    const [isConnected,
      setIsConnected] =
      useState(true);

    useEffect(() => {

      checkNetwork();

      const interval =
        setInterval(
          checkNetwork,
          5000
        );

      return () =>
        clearInterval(interval);

    }, []);

    const checkNetwork =
      async () => {

        const state =
          await Network.getNetworkStateAsync();

        setIsConnected(
          !!state.isConnected
        );
      };

    return {
      isConnected,
    };
  };
