import { CreateMovieTemplate } from "@/components/template/create-movie-tempate";
import { SYSTEM_ROLES } from "@/static-data/common-roles";
import { ADMIN_ROUTES } from "@/static-data/routes";
import { useAuth } from "@/utils/auth";
import React from "react";

const CreateMovie = () => {
  useAuth({
    allowedRoles: [SYSTEM_ROLES.ADMIN],
    path: ADMIN_ROUTES.CREATEMOVIE.absolutePath,
  });
  return <CreateMovieTemplate />;
};

export default CreateMovie;
