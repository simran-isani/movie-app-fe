import { MovieListTemplate } from "@/components/template/movieList-template";
import { SYSTEM_ROLES } from "@/static-data/common-roles";
import { USER_ROUTES } from "@/static-data/routes";
import { useAuth } from "@/utils/auth";
import React from "react";

const MovieList = () => {
  useAuth({
    allowedRoles: [SYSTEM_ROLES.USER],
    path: USER_ROUTES.MOVIELIST.absolutePath,
  });
  return <MovieListTemplate />;
};

export default MovieList;
