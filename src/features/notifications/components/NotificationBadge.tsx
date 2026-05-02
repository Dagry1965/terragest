interface NotificationBadgeProps {

  total: number;
}

export const NotificationBadge = ({
  total,
}: NotificationBadgeProps) => {

  if (total <= 0) {
    return null;
  }

  return (

    <div
      className="
        inline-flex
        items-center
        justify-center
        min-w-[28px]
        h-7
        px-2
        rounded-full
        bg-red-600
        text-white
        text-sm
        font-bold
      "
    >
      {total}
    </div>
  );
}
