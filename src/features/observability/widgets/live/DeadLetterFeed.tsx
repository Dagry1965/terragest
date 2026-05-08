export default function
DeadLetterFeed() {

  return (

    <div
      className="
        bg-red-50
        rounded-2xl
        p-6
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          text-red-700
        "
      >
        Dead Letters
      </h2>

      <p className="mt-4">
        Failed runtime events
        will appear here.
      </p>

    </div>
  );
}
