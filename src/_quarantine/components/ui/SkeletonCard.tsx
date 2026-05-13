export const SkeletonCard = () => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">

      <div className="h-6 bg-gray-200 rounded w-1/2"></div>

      <div className="mt-4 h-4 bg-gray-200 rounded w-full"></div>

      <div className="mt-2 h-4 bg-gray-200 rounded w-2/3"></div>

    </div>
  );
}
