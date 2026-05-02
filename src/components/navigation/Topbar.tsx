"use client";

export const Topbar = () => {

  return (

    <header className="
      bg-white
      border-b
      px-6
      py-4
      flex
      items-center
      justify-between
    ">

      <div>

        <h2 className="
          text-2xl
          font-bold
        ">
          Enterprise Platform
        </h2>

      </div>

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          w-10
          h-10
          rounded-full
          bg-gray-200
        " />

      </div>

    </header>
  );
}
