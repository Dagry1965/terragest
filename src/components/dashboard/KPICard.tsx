type Props = {
  title: string;
  value: string;
  subtitle: string;
};

export const KPICard = ({
  title,
  value,
  subtitle,
}: Props) => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        border
      "
    >
      <p
        className="
          text-sm
          text-gray-500
        "
      >
        {title}
      </p>

      <h3
        className="
          text-3xl
          font-bold
          mt-2
        "
      >
        {value}
      </h3>

      <p
        className="
          text-sm
          text-green-600
          mt-3
        "
      >
        {subtitle}
      </p>
    </div>
  );
};