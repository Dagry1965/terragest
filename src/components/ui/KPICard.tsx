interface KPICardProps {

  title: string;

  value: number | string;
}

export const KPICard = ({
  title,
  value,
}: KPICardProps) => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
};
