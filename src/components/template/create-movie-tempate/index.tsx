import { useUploadVideo } from "@/api/queries/upload-movie";
import Button from "@/components/atoms/button";
import { InputField } from "@/components/atoms/input";
import { videoSchema } from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiDownload } from "react-icons/fi";

export const CreateMovieTemplate = () => {
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { mutate: uploadVideo, isPending } = useUploadVideo();

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

  const onSubmit = async (data: any) => {
    const isValid = await trigger();
    if (isValid) {
      const submissionData = { ...data, year };
      uploadVideo(submissionData);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setValue("file", droppedFile);
      trigger("file");
    }
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setValue("file", selectedFile);
      trigger("file");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-secondary py-[120px] login-wrapper h-dvh">
      <div className="container">
        <h3 className="flex gap-3 text-5xl leading-[56px] font-semibold text-white items-center">
          Create a new movie
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
              <div className="flex flex-col justify-center items-center">
                <FiDownload size={20} className="text-white mb-[8px]" />
                <p className="text-white">
                  {file ? file.name : "Drop an image here"}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
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
                  name="year"
                  value={year}
                  onChange={(e: any) => {
                    setYear(e.target.value), setValue("year", e.target.value);
                    trigger("year");
                  }}
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
