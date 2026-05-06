import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
// src/components/timeline/Timeline.tsx

interface TimelineEntry {

  id: string;

  label: string;

  date: string;
}

interface TimelineProps {

  entries:
    TimelineEntry[];
}

export function Timeline({

  entries
}: TimelineProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h3
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Timeline
      </h3>

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

            <div
              className="
                font-medium
              "
            >
              {entry.label}
            </div>

            <div
              className="
                text-sm
                text-zinc-500
              "
            >
              {formatDisplayValue(entry.date)}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}


