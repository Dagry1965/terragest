type RuntimeListener = (
  payload: any
) => void;

const runtimeChannels =
  new Map<
    string,
    RuntimeListener[]
  >();

export function subscribeRuntimeChannel(
  channel: string,
  listener: RuntimeListener
) {
  if (
    !runtimeChannels.has(
      channel
    )
  ) {
    runtimeChannels.set(
      channel,
      []
    );
  }

  runtimeChannels
    .get(channel)!
    .push(listener);

  console.log(
    "ERP REALTIME SUBSCRIBED",
    channel
  );

  return () => {
    const listeners =
      runtimeChannels.get(
        channel
      ) || [];

    runtimeChannels.set(
      channel,
      listeners.filter(
        (item) =>
          item !== listener
      )
    );
  };
}

export function publishRuntimeEvent(
  channel: string,
  payload: any
) {
  const listeners =
    runtimeChannels.get(
      channel
    ) || [];

  console.log(
    "ERP REALTIME EVENT",
    channel
  );

  for (const listener of listeners) {
    listener(payload);
  }
}

export function getRuntimeChannels() {
  return runtimeChannels;
}
