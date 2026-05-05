import {
  MATERIEL_CREATED
}
from "../events/MaterielEvents";

import {
  MaterielRuntimeHook
}
from "./MaterielRuntimeHook";

import {
  MaterielRealtimeGateway
}
from "../realtime/MaterielRealtimeGateway";

import {
  MaterielSupervisionService
}
from "../supervision/MaterielSupervisionService";

export class
EnterpriseMaterielFlow {

  private runtime =
    new MaterielRuntimeHook();

  private realtime =
    new MaterielRealtimeGateway();

  private supervision =
    new MaterielSupervisionService();

  async create(
    payload?: unknown
  ) {

    await this.runtime.emit(
      MATERIEL_CREATED,
      payload
    );

    this.realtime.publish(
      MATERIEL_CREATED,
      payload
    );

    this.supervision.monitor(
      MATERIEL_CREATED
    );

    console.log(
      "[EnterpriseMaterielFlow]"
    );
  }
}
