"use client";

interface EnterpriseFormProps {

  title: string;

  children: React.ReactNode;

  onSubmit?: any;
}

export const EnterpriseForm = ({
  title,
  children,
  onSubmit,
}: EnterpriseFormProps) => {

  return (

    <form
      onSubmit={onSubmit}
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-8
        space-y-6
      "
    >

      <h1 className="
        text-4xl
        font-bold
      ">
        {title}
      </h1>

      {children}

      <button
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
        "
      >

        Enregistrer

      </button>

    </form>
  );
}
