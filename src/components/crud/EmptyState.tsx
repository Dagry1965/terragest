type Props = {
  title: string;

  description: string;
};

export const EmptyState = ({
  title,
  description,
}: Props) => {

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-10
        text-center
      "
    >
      <h3
        className="
          text-2xl
          font-semibold
        "
      >
        {title}
      </h3>

      <p
        className="
          text-gray-500
          mt-3
        "
      >
        {description}
      </p>
    </div>
  );
};