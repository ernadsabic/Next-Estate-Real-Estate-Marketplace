import { UploadDropzone } from "@/lib/utils/uploadthing";
import { FormData } from "../../Types/formType";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  step: number;
  formValues: FormData;
  setFormValues: React.Dispatch<React.SetStateAction<FormData>>;
};

const StepFive = ({ step, formValues, setFormValues }: Props) => {
  const hasImages = formValues.imageUrl && formValues.imageUrl.length > 0;

  const handleCloseImage = (index: number) => {
    const filteredImages = formValues.imageUrl.filter((_, i) => i !== index);
    setFormValues((prev) => ({ ...prev, imageUrl: [...filteredImages] }));
  };
  return (
    <>
      <div className="flex justify-between mb-6">
        <span className="text-gray-500">{`Step ${step} of 6`}</span>
        <h1 className="font-medium">Upload Property Image</h1>
      </div>
      {hasImages && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {formValues.imageUrl.map((img, index) => (
            <div
              className="overflow-hidden relative aspect-video rounded-xl shadow-md w-full"
              key={img}
            >
              <Image
                src={img}
                alt="Preview Image"
                fill
                className="object-center object-cover"
              />
              <button
                type="button"
                onClick={() => handleCloseImage(index)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}{" "}
      <UploadDropzone
        className="mb-6"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          const newUrls = res.map((file) => file.ufsUrl);
          setFormValues((prev) => ({
            ...prev,
            imageUrl: [...(prev.imageUrl || []), ...newUrls],
          }));
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {console.log(formValues.imageUrl)}
    </>
  );
};

export default StepFive;
