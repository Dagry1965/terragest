export class
AntiDuplicationGuard {

  check(
    resource: string
  ) {

    console.log(
      "[Governance] duplication checked",
      resource
    );

    return false;
  }
}
