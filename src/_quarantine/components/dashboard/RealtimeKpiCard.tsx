"use client";

import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";

interface Props {

  organisationId: string;

  collectionName: string;

  label: string;
}

export const RealtimeKpiCard = ({
  organisationId,
  collectionName,
  label,
}: Props) => {

  const {
    data,
  } = useRealtimeCollection({

    collectionName,

    organisationId,
  });

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <p className="text-gray-500">
        {label}
      </p>

      <h2 className="
        text-4xl
        font-bold
        mt-4
      ">
        {data.length}
      </h2>

    </div>
  );
}
