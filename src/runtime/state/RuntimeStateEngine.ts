import {
  runtimeStates,
}
from "@/runtime/state/runtimeStates";

export class RuntimeStateEngine {

  static getStates(
    module: string
  ) {

    return runtimeStates.filter(

      (state) =>

        state.module ===
          module
    );
  }

  static getState(

    module: string,

    code: string,

  ) {

    return runtimeStates.find(

      (state) =>

        state.module ===
          module &&

        state.code ===
          code
    );
  }

  static isEditable(

    module: string,

    code: string,

  ) {

    const state =
      this.getState(
        module,
        code
      );

    if (!state) {
      return true;
    }

    return (
      state.editable !== false
    );
  }

  static isFinal(

    module: string,

    code: string,

  ) {

    const state =
      this.getState(
        module,
        code
      );

    return (
      state?.final === true
    );
  }
}
