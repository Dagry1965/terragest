interface ButtonProps {

  label: string;

  onClick?: () => void;
}

export const Button = ({
  label,
  onClick,
}: ButtonProps) => {

  return (

    <button
      onClick={onClick}
      className="
        px-5
        py-3
        rounded-xl
        bg-black
        text-white
        font-medium
        hover:opacity-90
      "
    >

      {label}

    </button>
  );
}
