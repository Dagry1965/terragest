import type {
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

interface ERPWorkspaceWidgetCardProps {
  widget: ERPDashboardWidgetResult;
}

export function ERPWorkspaceWidgetCard({
  widget,
}: ERPWorkspaceWidgetCardProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        p-5
      "
    >

      <p
        className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-slate-500
        "
      >
        {widget.type}
      </p>

      <h3
        className="
          mt-2
          text-sm
          font-semibold
          text-slate-950
        "
      >
        {widget.title}
      </h3>

      {widget.value !== undefined ? (

        <p
          className="
            mt-4
            text-3xl
            font-bold
            tracking-tight
            text-slate-950
          "
        >
          {widget.value}
        </p>

      ) : null}

      {widget.items ? (

        <div className="mt-4 space-y-2">

          {widget.items.slice(0, 5).map((item) => (

            <div
              key={item.id}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-900
                "
              >
                {item.title}
              </p>

              {item.date ? (

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  {item.date}
                </p>

              ) : null}

            </div>

          ))}

        </div>

      ) : null}

    </div>

  );
}