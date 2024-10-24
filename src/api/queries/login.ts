import { useRouter } from "next/router";
import { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "@/utils/decodeToken";
import { ACCESS_TOKEN, SYSTEM_ROLES } from "@/static-data/common-roles";
import { userProps, userInfoProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ADMIN_ROUTES, USER_ROUTES } from "@/static-data/routes";

const loginUser = async (loginProps: userProps) => {
  try {
    const reqOptions = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(loginProps),
    };
    const { data } = await axios(reqOptions);
    return data;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const error = err as { response: { data: { message: string[] } } };
      if (Array.isArray(error.response.data.message)) {
        const errorMessages = error.response.data.message.join("\n");
        toast.error(`\n${errorMessages}`);
      } else {
        console.error("Unexpected error format", error);
      }
    } else {
      console.error("An unknown error occurred", err);
    }
  }
};

export const useGetLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (loginProps: userProps) => loginUser(loginProps),
    onSuccess: (data: any) => {
      if (data.status === 201) {
        toast.success("Login successfully");
        localStorage.setItem(ACCESS_TOKEN, data.data.token);
        const userInfo:
          | ((userInfoProps & JwtPayload & (string | JwtPayload)) | any)
          | null = decodeToken(data.data.token);
        if (userInfo?.role?.includes(SYSTEM_ROLES.ADMIN)) {
          router.push(ADMIN_ROUTES.MOVIELIST.absolutePath);
        } else if (userInfo?.role?.includes(SYSTEM_ROLES.USER)) {
          router.push(USER_ROUTES.MOVIELIST.absolutePath);
        } else {
          router.push("/");
        }
      }
    },
  });
};
