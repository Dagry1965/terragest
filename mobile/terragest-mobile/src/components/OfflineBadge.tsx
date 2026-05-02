interface OfflineBadgeProps {

  offline: boolean;
}

export const OfflineBadge = ({
  offline,
}: OfflineBadgeProps) => {

  if (!offline) {
    return null;
  }

  return (

    <div
      style={{
        backgroundColor:
          "#dc2626",

        padding: 10,

        borderRadius: 12,
      }}
    >

      <p
        style={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        MODE OFFLINE
      </p>

    </div>
  );
}
