"use client";

export const AppTopbar = () => {

  return (

    <header className="
      h-20
      bg-white
      border-b
      flex
      items-center
      justify-between
      px-8
    ">

      <div>

        <h1 className="
          text-2xl
          font-bold
        ">

          Enterprise Platform

        </h1>

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
