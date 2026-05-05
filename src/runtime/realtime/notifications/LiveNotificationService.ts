export class
LiveNotificationService {

  notify(
    title: string,
    payload?: unknown
  ) {

    console.log(
      "[Live Notification]",
      title,
      payload
    );
  }
}
