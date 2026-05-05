export default function
WorkflowStatusPanel() {

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
        Workflow Status
      </h2>

      <div
        className="
          mt-4
          flex
          flex-col
          gap-3
        "
      >

        <div
          className="
            bg-green-50
            p-3
            rounded-xl
          "
        >
          Breakdown Flow : ACTIVE
        </div>

      </div>

    </div>
  );
}
