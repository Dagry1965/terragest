"use client";

import React from "react";

interface ButtonProps {

  children?: React.ReactNode;

  onClick?: () => void | Promise<void>;

  disabled?: boolean;

  className?: string;

  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}: ButtonProps) {

  return (

    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4
        py-2
        rounded-lg
        bg-black
        text-white
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >

      {children}

    </button>
  );
}