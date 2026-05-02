interface SubscriptionBadgeProps {

  plan: string;
}

export const SubscriptionBadge = ({
  plan,
}: SubscriptionBadgeProps) => {

  const getClassName = () => {

    switch (plan) {

      case "STARTER":
        return "bg-gray-200 text-gray-700";

      case "PRO":
        return "bg-blue-100 text-blue-700";

      case "ENTERPRISE":
        return "bg-black text-white";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <div
      className={`
        inline-flex
        items-center
        px-4
        py-2
        rounded-full
        text-sm
        font-bold
        ${getClassName()}
      `}
    >
      {plan}
    </div>
  );
}
