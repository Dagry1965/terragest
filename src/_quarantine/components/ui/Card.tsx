interface CardProps {

  title: string;

  children?: React.ReactNode;
}

export const Card = ({
  title,
  children,
}: CardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        {title}
      </h2>

      {children}

    </div>
  );
}
