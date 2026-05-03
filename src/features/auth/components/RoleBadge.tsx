import { UserRole }
from "@/features/auth/types/UserRole";

interface RoleBadgeProps {

  role: UserRole;
}

export const RoleBadge = ({
  role,
}: RoleBadgeProps) => {

  const getClassName = () => {

    switch (role) {

      case "admin":
        return "bg-red-100 text-red-700";

      case "manager":
        return "bg-blue-100 text-blue-700";

      case "agent":
        return "bg-green-100 text-green-700";

      case "viewer":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${getClassName()}
      `}
    >
      {role}
    </span>
  );
};