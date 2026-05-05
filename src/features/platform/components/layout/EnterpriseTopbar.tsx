export default function
EnterpriseTopbar() {

  return (

    <header
      className="
        h-20
        bg-white
        border-b
        flex
        items-center
        justify-between
        px-8
      "
    >

      <div>

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Enterprise Runtime
        </h2>

      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div
          className="
            bg-green-100
            text-green-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
          "
        >
          Runtime Healthy
        </div>

      </div>

    </header>
  );
}
