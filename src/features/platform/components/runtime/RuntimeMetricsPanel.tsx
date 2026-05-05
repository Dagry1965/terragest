export default function
RuntimeMetricsPanel() {

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
          text-lg
          font-semibold
        "
      >
        Runtime Metrics
      </h2>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          mt-4
        "
      >

        <div
          className="
            bg-slate-100
            p-4
            rounded-xl
          "
        >
          Events : 0
        </div>

        <div
          className="
            bg-slate-100
            p-4
            rounded-xl
          "
        >
          Workflows : 1
        </div>

      </div>

    </div>
  );
}
