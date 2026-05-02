export const EventStreamingService = {

  publish(
    topic: string,
    payload: any
  ) {

    console.log(

      `[STREAM]`,
      topic,
      payload
    );
  },

  subscribe(
    topic: string,
    callback: any
  ) {

    console.log(
      `Subscribed to ${topic}`
    );

    callback({
      topic,
    });
  },
};
