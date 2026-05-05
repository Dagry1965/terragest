export class
RuntimeChannelManager {

  subscribe(
    channel: string
  ) {

    console.log(
      "[Channel Subscribe]",
      channel
    );
  }

  unsubscribe(
    channel: string
  ) {

    console.log(
      "[Channel Unsubscribe]",
      channel
    );
  }
}
