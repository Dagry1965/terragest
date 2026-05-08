export default function
DeadLetterPanel() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2 className="text-lg font-semibold">
        Dead Letters
      </h2>

      <p className="mt-4">
        Failed workflows will appear here.
      </p>

    </div>
  );
}
