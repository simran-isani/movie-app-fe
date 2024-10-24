import Button from "@/components/atoms/button";
import { ADMIN_ROUTES } from "@/static-data/routes";
import { useRouter } from "next/navigation";
import React from "react";

export const EmptyMessageTemplate = () => {
  const router = useRouter();
  return (
    <div className="bg-secondary justify-center flex items-center h-[500px]">
      <div className="flex flex-col gap-4 j">
        <h3 className="flex gap-3 text-5xl leading-[56px] font-semibold text-white items-center">
          Your movie list is empty
        </h3>
        <div className="flex justify-center mt-[40px]">
          <Button
            text="Add a new movie"
            onClick={() => {
              router.push(ADMIN_ROUTES.CREATEMOVIE.absolutePath);
            }}
          />
        </div>
      </div>
    </div>
  );
};
