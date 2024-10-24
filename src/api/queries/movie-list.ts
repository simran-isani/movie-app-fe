import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies`, {
        headers: { "Content-Type": "application/json" },
      });

      return data;
    },
 
  });
};

export const useMovieMutation = () => {
  return useMutation({
    mutationFn: async (newMovie) => {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/movies`, newMovie, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Movie added successfully!");
    },
    onError: (error) => {
      toast.error(`Error adding movie: ${error.message}`);
    },
  });
};
