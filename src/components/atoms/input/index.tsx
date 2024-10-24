import Image from "next/image";
import React, { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";

interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  loading?: boolean;
  className?: React.ReactNode;
  isClear?: boolean;
}

export const InputField: FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  label,
  loading,
  className,
  isClear,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClear = () => {
    setValue(name, "");
  };

  return (
    <>
      <div className="mb-5 w-full"> 
        <div className="grow">
          <label className="text-sm leading-5 font-normal">{label}</label>
          <div className="relative">
            <input
              type={type === "password" && !showPassword ? "password" : "text"}
              placeholder={placeholder}
              className={`border border-[#224957] text-white placeholder:text-white w-full p-[10px] rounded-lg focus:outline-none focus:ring-1 focus:border-white focus:ring-secondary bg-[#224957] placeholder:text-[14px] placeholder:leading-6 input-shadow text-base font-normal ${className}`}
              {...props}
              {...register(name)}
            />
            {isClear && watch(name) && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Image
                  src="/svgs/close-circle.svg"
                  height={22}
                  width={22}
                  alt="close-circle"
                  onClick={handleClear}
                />
              </button>
            )}
            {!isClear && type === "password" && (
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <GoEye size={20} color="gray" />
                ) : (
                  <GoEyeClosed size={20} color="gray" />
                )}
              </button>
            )}
          </div>
        </div>
        {errors[name] && (
          <small className="text-red-600  absolute">
            {errors[name]?.message as string}
          </small>
        )}
      </div>
    </>
  );
};
