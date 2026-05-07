"use client";

export function ERPWorkflowStep({
  title,
  status,
  description,
}: {
  title: string;
  status: "done" | "active" | "pending";
  description?: string;
}) {

  const styles = {

    done: {
      dot: "bg-emerald-500",
      border: "border-emerald-200 bg-emerald-50",
      text: "text-emerald-900",
    },

    active: {
      dot: "bg-blue-500",
      border: "border-blue-200 bg-blue-50",
      text: "text-blue-900",
    },

    pending: {
      dot: "bg-slate-300",
      border: "border-slate-200 bg-slate-50",
      text: "text-slate-700",
    },
  };

  const current = styles[status];

  return (

    <div
      className={`
        rounded-2xl
        border
        p-5
        ${current.border}
      `}
    >

      <div className="flex items-start gap-4">

        <div
          className={`
            mt-1
            h-3
            w-3
            rounded-full
            ${current.dot}
          `}
        />

        <div>

          <p
            className={`
              font-semibold
              ${current.text}
            `}
          >
            {title}
          </p>

          {description && (

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}
