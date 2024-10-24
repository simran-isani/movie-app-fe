import { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";
import { decodeToken } from "../utils/decodeToken";
import { toast } from "react-toastify";
import { userInfoProps } from "@/types";
import { ACCESS_TOKEN } from "@/static-data/common-roles";

export const useUser = () => {
  const [user, setUser] = useState<userInfoProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const userInfo = decodeToken(token) as
        | (userInfoProps & JwtPayload)
        | null;

      if (userInfo) {
        setUser(userInfo);
      }
    } catch (error) {
      toast.error(
        `JWT Decode error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading };
};
