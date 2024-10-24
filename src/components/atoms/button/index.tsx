import Image from "next/image";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  text: string;
  disabled?: boolean;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  text,
  disabled = false, 
  icon,
  onClick,
  ...props
}) => {
  const baseStyles =
    "py-[15px] px-[18px] text-base leading-6 font-bold rounded-lg";

  const variantStyles =
    variant === "primary" ? "text-white bg-primary" : "bg-transparent";

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className} flex gap-3 items-center justify-center`}
      {...props}
    >
      {icon && <Image src={icon} width={20} height={20} alt="icon" />}
      {text}
    </button>
  );
};

export default Button;
