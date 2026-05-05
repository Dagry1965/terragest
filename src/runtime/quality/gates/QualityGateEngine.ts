import {
  RuntimeValidator
}
from "../validation/RuntimeValidator";

import {
  DependencyHealthChecker
}
from "../health/DependencyHealthChecker";

import {
  EnterpriseBuildPipeline
}
from "../build/EnterpriseBuildPipeline";

import {
  RuntimeIntegrityCheck
}
from "../integrity/RuntimeIntegrityCheck";

import {
  WorkflowConsistencyCheck
}
from "../checks/WorkflowConsistencyCheck";

export class
QualityGateEngine {

  private runtime =
    new RuntimeValidator();

  private dependencies =
    new DependencyHealthChecker();

  private build =
    new EnterpriseBuildPipeline();

  private integrity =
    new RuntimeIntegrityCheck();

  private workflows =
    new WorkflowConsistencyCheck();

  execute() {

    this.runtime.validate();

    this.dependencies.check();

    this.build.execute();

    this.integrity.verify();

    this.workflows.verify();

    console.log(
      "[QualityGate] all checks passed"
    );

    return true;
  }
}
