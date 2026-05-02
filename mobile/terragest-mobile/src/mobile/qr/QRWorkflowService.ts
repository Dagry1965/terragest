export const QRWorkflowService = {

  processQRCode(
    value: string
  ) {

    return {

      workflow:
        "ASSET_TRACKING",

      value,
    };
  },
};
