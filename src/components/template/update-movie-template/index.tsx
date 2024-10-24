import Button from "@/components/atoms/button";
import { InputField } from "@/components/atoms/input";
import { videoSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiDownload } from "react-icons/fi";
import axios from "axios"; 
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from "@/static-data/common-roles";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/router";
import { USER_ROUTES } from "@/static-data/routes";

export const UpdateMovieTemplate = () => {
  const router = useRouter();
  const params = useParams();
  const [movie, setMovie] = useState({
    title: "",
    publisherYear: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const methods = useForm({
    resolver: yupResolver(videoSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = methods;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateMovie = async (data: any) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const updateData = { ...data, file };
    console.log(updateData, "updateData");

    try {
      const formData = new FormData();
      formData.append("title", updateData.title);
      formData.append("publisherYear", updateData.year);
      if (file) {
        formData.append("image", file);
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/movies/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Movie updated successfully!");
      router.push(USER_ROUTES.MOVIELIST.absolutePath)
      console.log(response.data);
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error("Failed to update movie. Please try again.");
    }
  };

  const onSubmit = async (data: any) => {
    const isValid = await trigger();
    if (isValid) {
      await updateMovie(data); 
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFile = (file: File | null) => {
    if (file) {
      setFile(file);
      setValue("file", file);
      trigger("file");
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    handleFile(selectedFile);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fetchMovie = async () => {
    setLoading(true);
    const token = localStorage.getItem(ACCESS_TOKEN);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/movies/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovie(data.data);
      methods.reset({
        title: data.data.title,
        year: new Date(data.data.publisherYear).getFullYear().toString(),
        file: data.data.image,
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!params?.id) return;
    fetchMovie();
  }, [params?.id]);


  const currentImageUrl = previewURL
    ? previewURL
    : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.image}`;

  return (
    <div className="bg-secondary py-[120px] login-wrapper h-dvh">
      <div className="container">
        <h3 className="flex gap-3 text-5xl leading-[56px] font-semibold text-white items-center">
          Edit
        </h3>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row pt-[120px] gap-[126px]"
          >
            <div
              className={`flex items-center justify-center w-full md:w-[473px] h-[500px] bg-[#224957] border-2 border-dashed border-gray-400 rounded-lg relative ${
                isDragging ? "border-primary" : "border-white"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              {currentImageUrl ? (
                <Image
                  src={currentImageUrl}
                  alt="image"
                  className="object-cover"
                  fill
                />
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <FiDownload size={20} className="text-white mb-[8px]" />
                  <p className="text-white">
                    {file ? file.name : "Drop an image here"}
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept="video/*"
                hidden
                onChange={handleFileChange}
              />
              {errors.file && (
                <small className="text-red-600 absolute bottom-[-30px]">
                  {errors.file?.message as string}
                </small>
              )}
            </div>

            <div className="flex flex-col md:ml-6 mt-6 md:mt-0 w-full md:w-[362px]">
              <InputField placeholder="Title" name="title" />
              <div className="relative flex flex-col">
                <input
                  type="number"
                  placeholder="Publishing year"
                  {...methods.register("year")}
                  className={`border border-[#224957] text-white placeholder:text-white p-[10px] rounded-lg focus:outline-none focus:ring-1 focus:border-white focus:ring-secondary bg-[#224957] placeholder:text-[14px] placeholder:leading-6 input-shadow text-base font-normal w-[216px]`}
                />
                {errors.year && (
                  <small className="text-red-600 absolute bottom-[-20px]">
                    {errors.year?.message as string}
                  </small>
                )}
              </div>
              <div className="flex space-x-4 mt-[64px]">
                <Button
                  text="Cancel"
                  variant="secondary"
                  className="text-white border rounded-[10px] w-full"
                />
                <Button text="Submit" className="w-full" />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
