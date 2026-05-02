export const DeploymentService = {

  deploy(
    environment: string
  ) {

    return {

      success: true,

      environment,

      deployedAt:
        new Date(),
    };
  },
};
