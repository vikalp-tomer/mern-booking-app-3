import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <>
      <h1>Guests</h1>
      <div className="flex gap-10">
        <label className="flex-1">
          Adults
          <input
            type="number"
            className="w-full border"
            {...register("adultCount", { required: "Adult count is required" })}
            min={1}
          />
          {errors.adultCount && <p className="text-red-500">{errors.adultCount.message}</p>}
        </label>
        <label className="flex-1">
          Children
          <input
            type="number"
            {...register("childCount", { required: "" })}
            className="w-full border"
            min={0}
          />
          {errors.childCount && <p className="text-red-500">{errors.childCount.message}</p>}
        </label>
      </div>
    </>
  );
};

export default GuestSection;
