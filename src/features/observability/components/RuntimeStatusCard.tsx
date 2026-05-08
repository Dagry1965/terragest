import { useRuntimeHealth }
from "../hooks/useRuntimeHealth";

export default function
RuntimeStatusCard() {

  const health =
    useRuntimeHealth();

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2 className="text-xl font-bold">
        Runtime Status
      </h2>

      <p className="mt-4">
        Status :
        {health?.status}
      </p>

    </div>
  );
}
