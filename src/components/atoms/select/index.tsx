import { Select, SelectItem, SelectedItems } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

type User = {
  key: string;
  value: string;
  id: number;
};

type UserSelectProps = {
  users: User[];
  label?: any;
  placeholder?: string;
};

export default function UserSelect({
  users,
  label,
  placeholder,
}: UserSelectProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const handleUserChange = (selectedKey: any) => {
    setValue(label, selectedKey.target.value);
  };


  return (
    <div className="relative w-full">
      <Select
        label={label}
        placeholder={placeholder}
        labelPlacement="outside"
        classNames={{
          base: "w-full focus:outline-none focus:ring-1 focus:border-white focus:ring-secondary",
          trigger:
            "h-12 bg-transparent border hover:bg-white rounded-[8px] border-[#D0D5DD]",
          label: "text-sm leading-5 font-normal",
        }}
        {...register(label)}
        onChange={handleUserChange}
        renderValue={(items: SelectedItems<User>) => {
          return items.map((item, id) => (
            <div key={id} className="flex items-center gap-2">
              <div className="flex flex-col">
                <span>{item.textValue}</span>
              </div>
            </div>
          ));
        }}
      >
        {users?.map((user, index) => (
          <SelectItem key={`${user.key}-${index}`} textValue={user.value}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{user.value}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </Select>
      {errors[label] && (
        <small className="text-red-600  absolute">
          {errors[label]?.message as string}
        </small>
      )}
    </div>
  );
}
