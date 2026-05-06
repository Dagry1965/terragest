interface Props {
  title: string;
  children: React.ReactNode;
}

export function ERPCard({
  title,
  children,
}: Props) {

  return (
    <div
      className="
        rounded-2xl
        bg-white
        shadow-md
        p-6
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        {title}
      </h2>

      {children}
    </div>
  );
}
