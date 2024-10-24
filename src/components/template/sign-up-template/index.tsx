import Button from "@/components/atoms/button";
import { InputField } from "@/components/atoms/input";
import { LOADING } from "@/static-data/common-roles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema";
import { useAddUser } from "@/api/queries/sign-up";

export const SignUpTemplate = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  const { mutate: signUpUser, isPending: isloading } = useAddUser();

  const onSubmit = (data: any) => {
    signUpUser(data);
  };
  return (
    <>
      <div className="flex justify-center items-center login-wrapper absolute overflow-auto w-full h-dvh bg-secondary">
        <div className="w-[360px] mx-auto">
          <h4 className="text-[64px] leading-[80px] font-semibold text-white text-center mb-10">
            Sign Up
          </h4>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <InputField
                placeholder="Enter your email"
                type="email"
                name="email"
              />
              <InputField
                placeholder="Password"
                type="password"
                name="password"
              />
              <Button text={`Sign up`} className="w-full" />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
