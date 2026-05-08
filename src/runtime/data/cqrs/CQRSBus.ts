export class CQRSBus {

  command(
    name: string
  ) {

    console.log(
      "[Command]",
      name
    );
  }

  query(
    name: string
  ) {

    console.log(
      "[Query]",
      name
    );
  }
}
