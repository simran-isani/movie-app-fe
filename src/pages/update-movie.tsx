import { UpdateMovieTemplate } from "@/components/template/update-movie-template";
import { SYSTEM_ROLES } from "@/static-data/common-roles";
import { ADMIN_ROUTES } from "@/static-data/routes";
import { useAuth } from "@/utils/auth";
import React from "react";

const UpdateMovie = () => {
  useAuth({
    allowedRoles: [SYSTEM_ROLES.ADMIN],
    path: ADMIN_ROUTES.CREATEMOVIE.absolutePath,
  });
  return <UpdateMovieTemplate />;
};

export default UpdateMovie;
