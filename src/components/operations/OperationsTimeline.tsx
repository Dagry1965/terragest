// src/components/operations/OperationsTimeline.tsx

interface OperationsTimelineEntry {

  id: string;

  label: string;
}

interface OperationsTimelineProps {

  entries:
    OperationsTimelineEntry[];
}

export function OperationsTimeline({

  entries
}: OperationsTimelineProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Activité runtime
      </h2>

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {entries.map(entry => (

          <div

            key={entry.id}

            className="
              border-l-2
              border-zinc-300
              pl-4
            "
          >
            {entry.label}
          </div>
        ))}

      </div>

    </div>
  );
}
