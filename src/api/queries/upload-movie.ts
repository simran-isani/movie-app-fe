import { UploadVideoProps } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ACCESS_TOKEN } from "@/static-data/common-roles";
import { USER_ROUTES } from "@/static-data/routes";

const uploadVideo = async (uploadProps: UploadVideoProps) => {
  const { title, year, file } = uploadProps;

  if (!file) {
    throw new Error("No file selected for upload.");
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("publisherYear", year);
  formData.append("image", file);

  try {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movies`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error during upload:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Error during upload.");
    }
    throw new Error("Failed to upload video. Please try again.");
  }
};

export const useUploadVideo = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (uploadProps: UploadVideoProps) => uploadVideo(uploadProps),
    onSuccess: (data) => {
      if (data?.status === 201) {
        toast.success(data?.data?.message);
        router.push(USER_ROUTES.MOVIELIST.absolutePath);
      } else {
        toast.error("Unexpected response format or status code.");
      }
    },
    onError: (error: Error) => {
      console.error("Error uploading video:", error);
      toast.error(error.message || "Failed to upload video. Please try again.");
    },
  });
};
