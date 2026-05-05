export class ApprovalEngine {

  approve(
    processId: string
  ) {

    console.log(
      "[Approval]",
      processId
    );

    return true;
  }

  reject(
    processId: string
  ) {

    console.log(
      "[Reject]",
      processId
    );

    return false;
  }
}
