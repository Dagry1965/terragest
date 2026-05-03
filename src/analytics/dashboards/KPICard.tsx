interface KPICardProps {

  title: string;

  value: any;
}

export const KPICard = ({
  title,
  value,
}: KPICardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="
        text-lg
        text-gray-500
      ">
        {title}
      </h2>

      <div className="
        text-4xl
        font-bold
        mt-4
      ">

        {value}

      </div>

    </div>
  );
}


