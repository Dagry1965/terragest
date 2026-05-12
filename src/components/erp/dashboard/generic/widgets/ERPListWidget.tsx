import type {
  ERPDashboardWidgetProps,
}
from "../registry/ERPDashboardWidgetRegistry";

export function ERPListWidget({
  widget,
}: ERPDashboardWidgetProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          text-slate-950
        "
      >
        {widget.title}
      </h2>

      <div
        className="
          mt-5
          space-y-3
        "
      >

        {(widget.items ?? [])
          .length === 0 ? (

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Aucune donnÃ©e.
          </p>

        ) : (

          widget.items?.map(
            (item) => (

              <div
                key={item.id}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  text-sm
                "
              >

                <div
                  className="
                    font-semibold
                    text-slate-950
                  "
                >
                  {item.title}
                </div>

                {item.date ? (

                  <div
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                    "
                  >
                    {item.date}
                  </div>

                ) : null}

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}