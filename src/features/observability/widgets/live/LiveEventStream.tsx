"use client";

import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
import {
  useEffect,
  useSyncExternalStore,
}
from "react";

import {
  liveEventStore,
}
from "../../stores/live/liveEventStore";

import {
  LiveObservabilityService
}
from "../../services/live/LiveObservabilityService";

type EventPayload = {
  nom?: string;
  categorie?: string;
  organisationId?: string;
};

export default function LiveEventStream() {

  useEffect(() => {

    const service =
      new LiveObservabilityService();

    const unsubscribe =
      service.subscribeToRuntimeEvents();

    return () => {
      unsubscribe();
    };

  }, []);

  const events =
    useSyncExternalStore(
      liveEventStore.subscribe.bind(
        liveEventStore
      ),
      liveEventStore.getAll.bind(
        liveEventStore
      ),
      liveEventStore.getAll.bind(
        liveEventStore
      )
    );

  return (

    <div
      className="
        bg-black
        text-green-400
        rounded-2xl
        p-6
        overflow-auto
      "
    >

      <h2 className="text-xl font-bold mb-4">
        Live Event Stream
      </h2>

      {events.length === 0 && (
        <p className="opacity-70">
          Aucun événement runtime pour le moment.
        </p>
      )}

      <div className="flex flex-col gap-4">

        {events.map((event, index) => {

          const payload =
            event.payload as EventPayload | undefined;

          return (

            <div
              key={`${event.type}-${formatDisplayValue(event.timestamp)}-${index}`}
              className="
                border
                border-green-700
                rounded-xl
                p-4
              "
            >

              <div className="font-bold text-green-300">
                {event.type}
              </div>

              <div className="text-xs opacity-70 mt-1">
                {
                  new Date(
                    event.timestamp
                  ).toLocaleString()
                }
              </div>

              {payload && (
                <div className="mt-3 text-sm space-y-1">

                  {payload.nom && (
                    <div>
                      Nom : {payload.nom}
                    </div>
                  )}

                  {payload.categorie && (
                    <div>
                      Catégorie : {payload.categorie}
                    </div>
                  )}

                  {payload.organisationId && (
                    <div>
                      Organisation : {payload.organisationId}
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}


