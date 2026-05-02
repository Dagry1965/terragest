interface PlatformKpiCardProps {

  title: string;

  value: number;
}

export const PlatformKpiCard = ({
  title,
  value,
}: PlatformKpiCardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="
        text-4xl
        font-bold
        mt-4
      ">
        {value}
      </h2>

    </div>
  );
}
