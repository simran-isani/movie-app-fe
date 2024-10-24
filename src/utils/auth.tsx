import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

interface Props {
  allowedRoles: string[];
  path: string;
}

export const useAuth = ({ allowedRoles, path }: Props) => {
  const router = useRouter();
  const { user, loading } = useUser();


  useEffect(() => {
    if (loading) return; 
    if (!user?.role) {
      router.push("/"); 
      return;
    }
    if (allowedRoles.some((role) => user?.role.includes(role))) {

      if (router.pathname !== path) {
        router.push(path);
      }
    } else {
      router.push("/"); 
    }
  }, [loading, user, allowedRoles, path, router]);
};
