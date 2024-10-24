import { useRouter } from "next/router";
import { ACCESS_TOKEN, SYSTEM_ROLES } from "@/static-data/common-roles";
import { userProps, userInfoProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpUser = async (signUpProps: userProps) => {
  try {
    const reqOptions = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(signUpProps),
    };
    const { data } = await axios(reqOptions);
    return data;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const error = err as {
        response: {
          status: number;
          data: {
            error: string;
            message: string;
          };
        };
      };
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      }
    }
  }
};

export const useAddUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (signUpProps: userProps) => SignUpUser(signUpProps),
    onSuccess: (data: any) => {
      if (data.status === 201) {
        toast.success("Signup successfully");
        router.push("/");
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
