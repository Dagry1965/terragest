import Link from "next/link";

type Props = {
  title: string;

  description: string;

  buttonLabel?: string;

  buttonHref?: string;
};

export const PageHeader = ({
  title,
  description,
  buttonLabel,
  buttonHref,
}: Props) => {

  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          {title}
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          {description}
        </p>
      </div>

      {buttonLabel &&
       buttonHref && (

        <Link
          href={buttonHref}
          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );
};