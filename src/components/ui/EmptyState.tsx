interface EmptyStateProps {

  title: string;

  description?: string;
}

export const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-10 text-center">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      {description && (

        <p className="text-gray-500 mt-2">

          {description}

        </p>

      )}

    </div>
  );
}
