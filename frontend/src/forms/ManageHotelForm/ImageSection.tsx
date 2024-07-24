import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2>Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        className="w-full border"
        {...register("imageFiles", {
          validate: (imageFiles) => {
            const totalLength = imageFiles.length;

            if (totalLength === 0) {
              return "At least one image is required";
            } else if (totalLength > 6) {
              return "At most 6 images are allowed";
            } else {
              return "true";
            }
          },
        })}
      />
      {errors.imageFiles && <p className="text-red-500">{errors.imageFiles.message}</p>}
    </div>
  );
};

export default ImageSection;
