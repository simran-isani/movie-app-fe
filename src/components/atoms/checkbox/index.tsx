import { Controller, useFormContext } from "react-hook-form";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

type CheckboxProps = {
  label: string;
  desc: { value: string; name: string }[];
  orientation?: "horizontal" | "vertical";
  color?: "default" | "primary" | "secondary";
  defaultValue?: string[];
};

export default function CustomCheckboxGroup({
  label,
  desc,
  orientation = "horizontal",
  color = "default",
  defaultValue = [],
}: CheckboxProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-[18px] relative">
      <h2 className="text-sm leading-5 font-normal mb-4">{label}</h2>
      <Controller
        name={label}
        defaultValue={defaultValue} 
        render={({ field: { onChange, value } }) => (
          <CheckboxGroup
            classNames={{ base: "w-full" }}
            orientation={orientation}
            color={color}
            value={value} 
            onChange={onChange}
          >
            <div
              className={`grid ${
                orientation === "horizontal" ? "grid-cols-5" : "grid-cols-1"
              } gap-4`}
            >
              {desc.map((city) => (
                <Checkbox
                  key={city.value}
                  value={city.value}
                  className="flex items-center"
                >
                  {city.name}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        )}
      />
      {errors[label] && (
        <small className="text-red-600 absolute">
          {errors[label]?.message as string}
        </small>
      )}
    </div>
  );
}
