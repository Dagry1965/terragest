export class OrganizationContext {

  resolve() {

    console.log(
      "[OrganizationContext]"
    );

    return {
      organizationId: "ORG-001",
    };
  }
}
